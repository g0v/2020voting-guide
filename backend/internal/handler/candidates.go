package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// ListCandidatesByConstituencyHandler provide constituency list
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

func GetCandidateByNameHandler(c *gin.Context) {
	name := c.Param("name")
	constituency := c.Param("constituency")

	var candidate models.Candidate

	candidate.Name = name

	var manualCandidateDb db.ManualCandidate
	db.MySQL.Where("name = ? AND constituency = ?", name, constituency).First(&manualCandidateDb)
	candidate.Photo = manualCandidateDb.Photo
	candidate.CurrentLegislator = manualCandidateDb.CurrentLegislator
	candidate.Age = manualCandidateDb.Age
	candidate.Party = manualCandidateDb.Party
	candidate.Constituency = manualCandidateDb.Constituency

	if manualCandidateDb.EducationConnection != "" {
		candidate.Education = manualCandidateDb.Education
		candidate.EducationConnection = manualCandidateDb.EducationConnection
	}
	if manualCandidateDb.ExperienceConnection != "" {
		candidate.Experience = manualCandidateDb.Experience
		candidate.ExperienceConnection = manualCandidateDb.ExperienceConnection
	}
	if manualCandidateDb.PoliticsConnection != "" {
		candidate.Politic = manualCandidateDb.Politics
		candidate.PoliticsConnection = manualCandidateDb.PoliticsConnection
	}
	if candidate.EducationConnection == "立法院OpenData" {
		candidate.EducationConnection = "https://data.ly.gov.tw/"
	}
	if candidate.ExperienceConnection == "立法院OpenData" {
		candidate.ExperienceConnection = "https://data.ly.gov.tw/"
	}

	c.JSON(http.StatusOK, candidate)
}

func GetCandidateFB(c *gin.Context) {

	name := c.Param("name")
	constituency := c.Param("constituency")

	var fbPage db.FB
	db.MySQL.Where("name = ? AND constituency = ?", name, constituency).Find(&fbPage)
	c.JSON(http.StatusOK, fbPage)
}
