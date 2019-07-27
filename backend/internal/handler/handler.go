package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Config struct {
	Mysql struct {
		Host     string
		User     string
		Password string
		DB       string
	}
}

// @Summary 2020 Voting Guide Service Version
// @Success 200 {string} string "X.X.X"
// @Failure 500 "fail"
// @Router /version [get]
func VersionHandler(c *gin.Context) {
	c.String(http.StatusOK, "0.0.1")
}

// @Summary get the candidate by id
// @Description get the candidate by id
// @Accept json
// @Produce json
// @Param id path string true "ID"
// @Success 200 {object} models.Candidate
// @Router /candidate/{id} [get]
func GetCandidateByIdHandler(c *gin.Context) {
	id := c.Param("id")
	fmt.Println(id)

	r := models.Candidate{
		ID:    "1",
		Name:  "Ding",
		Photo: "",
		Party: models.PartyCard{
			ID:     "1",
			Name:   "KMT",
			Emblem: "",
		},
		Age:                   50,
		BornIn:                "Taipei",
		EducationalBackground: []string{"XXX"},
		Experiences:           []string{"legislator", "Taipei major candidate"},
		Politics:              "I am Ding",
	}

	c.JSON(http.StatusOK, r)
}

// @Summary get records of candidate by id
// @Description get records of candidate by id
// @Accept json
// @Product string
// @Param id path string ture "ID"
// @Success 200 {string} string "record"
// @Router /candidate/{id}/record [get]
func GetCandidateRecordByIdHandler(c *gin.Context) {

	id := c.Param("id")
	fmt.Println(id)

	c.String(http.StatusOK, "record")
}
