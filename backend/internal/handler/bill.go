package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"
	"github.com/gin-gonic/gin"
)

func ListRelateBills(c *gin.Context) {

	name := c.Param("name")
	var candidate db.ManualCandidate
	db.MySQL.Where("name = ?", name).Last(&candidate)

	var bills []models.Bill

	var personalBillsDb []db.Bill
	db.MySQL.Where("billNo IN (?) AND term = 09", db.MySQL.Table("proposercosignatory").Select("billNo").Where("name = ? AND role = 'proposer'", name).QueryExpr()).Find(&personalBillsDb)
	for _, bill := range personalBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		bills = append(bills, models.Bill{
			Name:                  bill.Name,
			BillNo:                bill.BillNo,
			ProposerType:          "立委提案",
			Description:           "",
			Date:                  date,
			Category:              bill.Category,
			BillOrg:               bill.BillOrg,
			BillProposerString:    bill.BillProposer,
			BillCosignatoryString: bill.BillCosignatory,
			BillStatus:            bill.BillStatus,
			PdfURL:                bill.PdfURL,
			CaseOfAction:          bill.CaseOfAction,
			Vernacular:            "",
		})
	}

	var orgBillsDb []db.Bill
	fmt.Println(candidate.Party)
	caucusFilter := "本院" + getCaucusName(candidate.Party)
	db.MySQL.Where("billOrg LIKE ? AND term = ?", caucusFilter, "09").Find(&orgBillsDb)
	for _, bill := range orgBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		bills = append(bills, models.Bill{
			Name:                  bill.Name,
			BillNo:                bill.BillNo,
			ProposerType:          "黨團提案",
			Description:           "",
			Date:                  date,
			Category:              bill.Category,
			BillOrg:               bill.BillOrg,
			BillProposerString:    bill.BillProposer,
			BillCosignatoryString: bill.BillCosignatory,
			BillStatus:            bill.BillStatus,
			PdfURL:                bill.PdfURL,
			CaseOfAction:          bill.CaseOfAction,
			Vernacular:            "",
		})
	}
	c.JSON(http.StatusOK, bills)
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
		ProposerType:    "",
		Description:     "",
		Date:            "",
		Category:        billDb.Category,
		BillOrg:         billDb.BillOrg,
		BillProposer:    []models.NameParty{},
		BillCosignatory: []models.NameParty{},
		BillStatus:      billDb.BillStatus,
		PdfURL:          billDb.PdfURL,
		CaseOfAction:    billDb.CaseOfAction,
		Vernacular:      "",
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
