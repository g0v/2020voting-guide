package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"
	"github.com/gin-gonic/gin"
)

// ListVernacular write newest record
func ListVernacular(c *gin.Context) {
	filter := c.Param("filter")

	var api []struct {
		Category   string `json:"category"`
		Name       string `json:"name"`
		BillNo     string `gorm:"column:billNo" json:"billNo"`
		Vernacular string `json:"vernacular"`
		Clicks     int    `json:"clicks"`
	}
	if filter == "All" {
		db.MySQL.Raw("SELECT bill.category, bill.name, bill.billNo, vernacular.vernacular FROM `bill` LEFT JOIN (SELECT max(id) id, bill_no from vernacular group by bill_no) t1 on t1.bill_no = bill.billNo left join vernacular on vernacular.id = t1.id WHERE category is not null and term = '09'").Scan(&api)
	} else if filter == "三讀" {
		db.MySQL.Raw(
			`SELECT
			bill.category,
			bill.name,
			bill.billNo,
			vernacular.vernacular
			FROM bill
			LEFT JOIN (
				SELECT max(id) id, bill_no 
				FROM vernacular
				GROUP BY bill_no
			) t1 ON t1.bill_no = bill.billNo 
			LEFT JOIN vernacular ON vernacular.id = t1.id 
			WHERE category is not null AND term = '09' AND billStatus = '三讀'`).Scan(&api)
	} else if filter == "clicks" {
		db.MySQL.Raw(
			`SELECT 
			billclicks.name, 
			t2.category, 
			t2.billNo, 
			vernacular.vernacular,
			billclicks.clicks
			FROM billclicks
			LEFT JOIN (
				SELECT bill.category, bill.name, bill.billNo, bill.sessionPeriod, bill.sessionTimes
				FROM bill 
				WHERE bill.term = '09' AND bill.category is not null
				group by bill.category, bill.name, bill.billNo, bill.sessionPeriod, bill.sessionTimes
			) t2 on billclicks.name = t2.name AND billclicks.sessionPeriod = t2.sessionPeriod AND billclicks.sessionTimes = t2.sessionTimes
			LEFT JOIN (SELECT max(id) id, bill_no from vernacular group by bill_no) t1 on t1.bill_no = t2.billNo 
			LEFT JOIN vernacular on vernacular.id = t1.id 
			WHERE t2.billNo is not null
			ORDER BY clicks DESC`).Scan(&api)
	}

	c.JSON(http.StatusOK, api)
}

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

	var api models.BillAPI
	api.Bill = models.Bill{
		Name:                  billDb.Name,
		BillNo:                billDb.BillNo,
		ProposerType:          "",
		Description:           "",
		Date:                  "",
		Category:              billDb.Category,
		BillOrg:               billDb.BillOrg,
		BillProposerString:    billDb.BillProposer,
		BillCosignatoryString: billDb.BillCosignatory,
		BillStatus:            billDb.BillStatus,
		PdfURL:                billDb.PdfURL,
		DocURL:                billDb.DocURL,
		CaseOfAction:          billDb.CaseOfAction,
		Vernacular:            vernacularDb.Vernacular,
	}

	var descriptionsDb []db.BillDescription
	api.Descriptions = []models.Description{}
	db.MySQL.Where("billNo = ?", id).Find(&descriptionsDb)
	for _, descriptionDb := range descriptionsDb {
		api.Descriptions = append(api.Descriptions, models.Description{
			Bill:        descriptionDb.Bill,
			Description: descriptionDb.Description,
			ActiveLaw:   descriptionDb.ActiveLaw,
			ReviseLaw:   descriptionDb.ReviseLaw,
		})
	}

	c.JSON(http.StatusOK, api)
}
