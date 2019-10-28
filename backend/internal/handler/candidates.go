package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// Candidate api for candidate
type Candidate struct {
	Name                   string `json:"name"`
	Photo                  string `json:"photo"`
	County                 string `json:"county"`
	Constituency           string `json:"constituency"`
	Party                  string `json:"party"`
	Age                    int16  `json:"age"`
	LastTerm               string `json:"lastTerm"`
	LastTermYear           string `json:"lastTermYear"`
	Educations             string `json:"educations"`
	Experiences            string `json:"experiences"`
	Politics               string `json:"politics"`
	SittingRate            string `json:"sittingRate"`
	InterpellationRate     string `json:"interpellationRate"`
	InterpellationNum      string `json:"interpellationNum"`
	MaxInterpellationNum   string `json:"maxInterpellationNum"`
	InterpellationCategory string `json:"interpellationCategory"`
	BillNum                string `json:"billNum"`
	BillNumCategory        string `json:"billNumCategory"`
	PoliticalContribution  string `json:"politicalContribution"`
	OtherCandidate         string `json:"otherCandidate"`
	Bills                  []Bill `json:"bills"`
}

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

	var candidate Candidate

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
	db.MySQL.Where("billProposer LIKE ?", nameFilter).Find(&personalBillsDb)
	candidate.Bills = []Bill{}
	for _, bill := range personalBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		candidate.Bills = append(candidate.Bills, Bill{
			bill.Name,
			bill.BillNo,
			"立委提案",
			"",
			date,
			bill.Category,
			bill.BillOrg,
			bill.BillProposer,
			bill.BillCosignatory,
			bill.BillStatus,
			bill.PdfURL,
			bill.CaseOfAction,
		})
	}

	var orgBillsDb []db.Bill
	caucusFilter := "%" + getCaucusName(candidate.Party) + "%"
	db.MySQL.Where("billOrg LIKE ?", caucusFilter).Find(&orgBillsDb)
	for _, bill := range orgBillsDb {
		date := bill.BillNo[0:3] + "-" + bill.BillNo[3:5] + "-" + bill.BillNo[5:7]
		candidate.Bills = append(candidate.Bills, Bill{
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
		})
	}

	c.JSON(http.StatusOK, candidate)
}
