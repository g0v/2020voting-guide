package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// ListCandidatesByConstituencyHandler provide constituency list
// @Summary List candidates by constituency
// @Description list candidates by constituency
// @Accept json
// @Produce json
// @Param constituency path string true "Constituency"
// @Success 200 {object} models.CandidateCards
// @Router /api/candidates/constituency/{constituency} [get]
func ListCandidatesByConstituencyHandler(c *gin.Context) {

	constituency := c.Param("constituency")

	var candidates models.CandidateCards
	db.MySQL.Table("candidate").Where("constituency = ?", constituency).Find(&candidates)
	c.JSON(http.StatusOK, candidates)
}

// GetCandidateByNameHandler return candidate info
// @Summary get the candidate by name
// @Description get the candidate by name
// @Accept json
// @Produce json
// @Param name path string true "Name"
// @Success 200 {object} models.Candidate
// @Router /api/candidate/{name} [get]
func GetCandidateByNameHandler(c *gin.Context) {
	name := c.Param("name")

	var candidate models.Candidate

	candidate.Name = name

	var candidateDb db.Candidate
	db.MySQL.Where("name = ?", name).First(&candidateDb)
	candidate.Age = candidateDb.Age
	candidate.Party = candidateDb.Party
	candidate.Photo = candidateDb.PicURL
	candidate.Constituency = candidateDb.Constituency
	candidate.LastTerm = candidateDb.LastTerm

	var personalBillsDb []db.Bill
	nameFilter := "%" + name + "%"
	db.MySQL.Where("billProposer LIKE ? AND term = ?", nameFilter, "09").Find(&personalBillsDb)
	for _, bill := range personalBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		candidate.Bills = append(candidate.Bills, models.Bill{
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
	caucusFilter := "%" + getCaucusName(candidate.Party) + "%"
	db.MySQL.Where("billOrg LIKE ? AND term = ?", caucusFilter, "09").Find(&orgBillsDb)
	for _, bill := range orgBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		candidate.Bills = append(candidate.Bills, models.Bill{
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

	c.JSON(http.StatusOK, candidate)
}
