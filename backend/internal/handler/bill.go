package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/gin-gonic/gin"
)

type bill struct {
	BillNo          string `json:"billNo"`
	Name            string `json:"name"`
	Category        string `json:"category"`
	BillProposer    string `json:"billProposer"`
	BillCosignatory string `json:"billCosignatory"`
	BillStatus      string `json:"billStatus"`
	PdfURL          string `json:"pdfUrl"`
}

type description struct {
	Bill        string `json:"bill"`
	Description string `json:"description"`
	ActiveLaw   string `json:"activeLaw"`
	ReviseLaw   string `json:"reviseLaw"`
}

type billAPI struct {
	Bill         bill          `json:"bill"`
	Descriptions []description `json:"descriptions"`
}

// GetBillHandler get bill info and bill description
func GetBillHandler(c *gin.Context) {

	id := c.Param("id")

	api := billAPI{}

	var billDb db.Bill
	db.MySQL.Where("billNo = ?", id).First(&billDb)
	api.Bill = bill{
		billDb.BillNo,
		billDb.Name,
		billDb.Category,
		billDb.BillProposer,
		billDb.BillCosignatory,
		billDb.BillStatus,
		billDb.PdfURL}

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
