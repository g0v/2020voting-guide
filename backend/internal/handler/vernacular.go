package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/gin-gonic/gin"
)

// PostVernacular write newest record
func PostVernacular(c *gin.Context) {
	id := c.Param("id")
	secret := c.PostForm("secret")
	msg := c.PostForm("msg")

	if secret != config.VernacularKey {
		c.JSON(400, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
		return
	}

	record := db.Vernacular{BillNo: id, Vernacular: msg}
	db.MySQL.Create(&record)

	c.JSON(http.StatusOK, "ok")
}

// GetVernacular write newest record
func GetVernacular(c *gin.Context) {
	id := c.Param("id")

	var billDb db.Bill
	db.MySQL.Where("billNo = ?", id).First(&billDb)

	var vernacularDb db.Vernacular
	db.MySQL.Where("bill_no = ?", id).Last(&vernacularDb)

	api := billAPI{Bill{}, []description{}}
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
		vernacularDb.Vernacular,
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
