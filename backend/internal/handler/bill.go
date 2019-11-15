package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"
	"github.com/gin-gonic/gin"
)

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
