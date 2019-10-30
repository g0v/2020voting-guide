package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/gin-gonic/gin"
)

// Bill api in candidate
type Bill struct {
	Name            string `json:"name"`
	BillNo          string `json:"billNo"`
	ProposerType    string `json:"proposerType"`
	Description     string `json:"description"`
	Date            string `json:"date"`
	Category        string `json:"category"`
	BillOrg         string `json:"billOrg"`
	BillProposer    string `json:"billProposer"`
	BillCosignatory string `json:"billCosignatory"`
	BillStatus      string `json:"billStatus"`
	PdfURL          string `json:"pdfUrl"`
	CaseOfAction    string `json:"caseOfAction"`
	Vernacular      string `json:"vernacular"`
}

type description struct {
	Bill        string `json:"bill"`
	Description string `json:"description"`
	ActiveLaw   string `json:"activeLaw"`
	ReviseLaw   string `json:"reviseLaw"`
}

type billAPI struct {
	Bill         Bill          `json:"bill"`
	Descriptions []description `json:"descriptions"`
}

// GetBillHandler get bill info and bill description
func GetBillHandler(c *gin.Context) {

	id := c.Param("id")

	api := billAPI{Bill{}, []description{}}

	var billDb db.Bill
	db.MySQL.Where("billNo = ?", id).First(&billDb)
	api.Bill = Bill{
		billDb.Name,
		billDb.BillNo,
		"",
		"",
		"",
		billDb.Category,
		billDb.BillOrg,
		billDb.BillProposer,
		billDb.BillCosignatory,
		billDb.BillStatus,
		billDb.PdfURL,
		billDb.CaseOfAction,
		"",
	}

	var descriptionsDb []db.BillDescription
	db.MySQL.Where("billNo = ?", id).Find(&descriptionsDb)
	for _, descriptionDb := range descriptionsDb {
		api.Descriptions = append(api.Descriptions, description{
			descriptionDb.Bill,
			descriptionDb.Description,
			descriptionDb.ActiveLaw,
			descriptionDb.ReviseLaw,
		})
	}

	c.JSON(http.StatusOK, api)
}
