package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"
	"github.com/gin-gonic/gin"
)

func ListRelatedBillsByParty(c *gin.Context) {
	party := c.Param("party")
	name := c.Param("name")

	if party == "" || name == "" {
		c.JSON(http.StatusNotFound, nil)
	}

	var bills []models.Bill

	personalBills := getPersonalBills(name)
	bills = append(bills, personalBills...)

	partyBills := getPartyBills(party)
	bills = append(bills, partyBills...)

	c.JSON(http.StatusOK, bills)
}

func ListRelatedBillsByConstituency(c *gin.Context) {

	name := c.Param("name")
	constituency := c.Param("constituency")

	var bills []models.Bill

	if constituency == "臺北市第七選舉區" && name == "許淑華" {
		var orgBillsDb []db.Bill
		caucusFilter := "本院民進黨黨團"
		db.MySQL.Where("billOrg LIKE ? AND term = ?", caucusFilter, "09").Find(&orgBillsDb)
		for _, bill := range orgBillsDb {
			bills = append(bills, bill.ToModelBill("黨團提案"))
		}
		c.JSON(http.StatusOK, bills)
		return
	}

	personalBills := getPersonalBills(name)
	bills = append(bills, personalBills...)

	candidateInfo := getRegionalCandidate(name, constituency)
	partyBills := getPartyBills(candidateInfo.Party)
	bills = append(bills, partyBills...)

	c.JSON(http.StatusOK, bills)
}

func getRegionalCandidate(name string, constituency string) (c db.ManualCandidate) {
	db.MySQL.Where("name = ? AND constituency = ?", name, constituency).Last(&c)
	return
}

func getPersonalBills(name string) []models.Bill {
	bills := []db.Bill{}
	db.MySQL.Where("billNo IN (?) AND term = 09", db.MySQL.Table("proposercosignatory").Select("billNo").Where("name = ? AND role = 'proposer'", name).QueryExpr()).Find(&bills)
	mBills := []models.Bill{}
	for _, bill := range bills {
		mBills = append(mBills, bill.ToModelBill("立委提案"))
	}
	return mBills
}

func getPartyBills(party string) []models.Bill {
	var orgBillsDb []db.Bill
	caucusFilter := "本院" + getCaucusName(party)
	db.MySQL.Where("billOrg LIKE ? AND term = ?", caucusFilter, "09").Find(&orgBillsDb)
	mBills := []models.Bill{}
	for _, bill := range orgBillsDb {
		mBills = append(mBills, bill.ToModelBill("黨團提案"))
	}
	return mBills
}

// GetBillHandler get bill info and bill description
func GetBillHandler(c *gin.Context) {

	id := c.Param("id")

	var api models.BillAPI

	var billDb db.Bill
	db.MySQL.Where("billNo = ?", id).First(&billDb)
	api.Bill = models.Bill{
		Name:            billDb.Name,
		BillNo:          billDb.BillNo,
		Description:     "",
		Date:            "",
		Category:        billDb.Category,
		BillOrg:         billDb.BillOrg,
		BillProposer:    []models.NameParty{},
		BillCosignatory: []models.NameParty{},
		BillStatus:      billDb.BillStatus,
		PdfURL:          billDb.PdfURL,
		CaseOfAction:    billDb.CaseOfAction,
		Vernacular:      billDb.Vernacular,
	}
	if strings.HasSuffix(billDb.BillOrg, "黨團") {
		api.Bill.ProposerType = "黨團提案"
	} else {
		api.Bill.ProposerType = "立委提案"
	}

	var descriptionsDb []db.BillDescription
	db.MySQL.Where("billNo = ?", id).Find(&descriptionsDb)
	api.Descriptions = []models.Description{}
	for _, descriptionDb := range descriptionsDb {
		api.Descriptions = append(api.Descriptions, models.Description{
			Bill:        descriptionDb.Bill,
			Description: descriptionDb.Description,
			ActiveLaw:   descriptionDb.ActiveLaw,
			ReviseLaw:   descriptionDb.ReviseLaw,
		})
	}

	var nameParty []models.NameParty
	db.MySQL.Table("proposercosignatory").
		Select("proposercosignatory.name, proposercosignatory.role, legislator.party").
		Joins("left join legislator on legislator.name = proposercosignatory.name").
		Where("proposercosignatory.billNo = ? and legislator.term = '09'", id).
		Scan(&nameParty)
	fmt.Println(nameParty)
	for _, person := range nameParty {
		if person.Role == "cosignatory" {
			api.Bill.BillCosignatory = append(api.Bill.BillCosignatory, person)
		}
		if person.Role == "proposer" {
			api.Bill.BillProposer = append(api.Bill.BillProposer, person)
		}
	}

	c.JSON(http.StatusOK, api)
}
