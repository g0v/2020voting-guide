package handler

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/gin-gonic/gin"
)

// ListVernacular write newest record
func ListVernacular(c *gin.Context) {
	page := c.Param("page")

	page_int, err := strconv.Atoi(page)
	if err == nil {
		fmt.Println(page_int)
	}

	offset := (page_int - 1) * 150

	var api []struct {
		Category   string `json:"category"`
		Name       string `json:"name"`
		BillNo     string `gorm:"column:billNo" json:"billNo"`
		Vernacular string `json:"vernacular"`
	}
	db.MySQL.Raw("SELECT bill.category, bill.name, bill.billNo, vernacular.vernacular FROM `bill` left join (SELECT max(id) id, bill_no from vernacular group by bill_no) t1 on t1.bill_no = bill.billNo left join vernacular on vernacular.id = t1.id WHERE category is not null and term = '09' LIMIT 3500 OFFSET ?", offset).Scan(&api)

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
