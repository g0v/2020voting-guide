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

	var candidatesDB []db.ManualCandidate
	db.MySQL.Where("constituency = ?", constituency).Find(&candidatesDB)

	var candidates []models.CandidateOverview
	for _, candidate := range candidatesDB {
		candidates = append(candidates, models.CandidateOverview{
			Name:              candidate.Name,
			Photo:             candidate.Photo,
			Party:             candidate.Party,
			Experience:        candidate.Experience,
			CurrentLegislator: candidate.CurrentLegislator,
		})
	}

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
	constituency := c.Param("constituency")

	var candidate models.Candidate

	candidate.Name = name

	var manualCandidateDb db.ManualCandidate
	db.MySQL.Where("name = ? AND constituency = ?", name, constituency).First(&manualCandidateDb)
	candidate.Photo = manualCandidateDb.Photo
	candidate.Educations = manualCandidateDb.Education
	candidate.Experiences = manualCandidateDb.Experience
	candidate.Politics = manualCandidateDb.Politics
	candidate.CurrentLegislator = manualCandidateDb.CurrentLegislator

	var candidateDb db.Candidate
	db.MySQL.Where("name = ? AND constituency = ?", name, constituency).First(&candidateDb)
	candidate.Age = candidateDb.Age
	candidate.Party = candidateDb.Party
	candidate.Constituency = candidateDb.Constituency
	candidate.LastTerm = candidateDb.LastTerm

	c.JSON(http.StatusOK, candidate)
}

func GetCandidateFB(c *gin.Context) {

	name := c.Param("name")
	constituency := c.Param("constituency")

	var fbPage db.FB
	db.MySQL.Where("name = ? AND constituency = ?", name, constituency).Find(&fbPage)
	c.JSON(http.StatusOK, fbPage)
}
