package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"

	"github.com/gin-gonic/gin"
)

// Party api for party
type Party struct {
	Name  string `json:"name"`
	Bills []Bill `json:"bills"`
}

func getCaucusName(party string) string {
	caucuses := map[string]string{
		"親民黨":      "親民黨黨團",
		"中國國民黨":    "國民黨黨團",
		"民主進步黨":    "民進黨黨團",
		"時代力量":     "時代力量黨團",
		"台灣團結聯盟黨團": "台灣團結聯盟黨團黨團",
	}
	if caucus, exist := caucuses[party]; exist {
		return caucus
	}
	return party
}

// GetPartyByNameHandler return party info
func GetPartyByNameHandler(c *gin.Context) {
	name := c.Param("name")

	var party Party

	party.Name = name

	var orgBillsDb []db.Bill
	caucusFilter := "%" + getCaucusName(name) + "%"
	db.MySQL.Where("billOrg LIKE ?", caucusFilter).Find(&orgBillsDb)
	for _, bill := range orgBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		party.Bills = append(party.Bills, Bill{
			bill.Name,
			bill.BillNo,
			"黨團提案",
			"",
			date,
			bill.Category,
			bill.BillOrg,
			bill.BillProposer,
			bill.BillCosignatory,
			bill.BillStatus,
			bill.PdfURL,
			bill.CaseOfAction,
			"",
		})
	}

	c.JSON(http.StatusOK, party)
}
