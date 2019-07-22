package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// @Summary 2020 Voting Guide Service Version
// @Success 200 {string} string "X.X.X"
// @Failure 500 "fail"
// @Router /version [get]
func VersionHandler(c *gin.Context) {
	c.String(http.StatusOK, "0.0.1")
}

// @Summary List candidates by constituency
// @Description list candidates by constituency
// @Accept json
// @Produce json
// @Param constituency path string true "Constituency"
// @Success 200 {object} models.CandidateCards
// @Router /candidates/constituency/{constituency} [get]
func ListCandidatesByConstituencyHandler(c *gin.Context) {
	ct := c.Param("constituency")
	fmt.Println(ct)

	r := models.CandidateCards{
		models.CandidateCard{
			ID:    "1",
			Name:  "Ding",
			Photo: "",
			Party: models.PartyCard{
				ID:     "1",
				Name:   "KMT",
				Emblem: "",
			},
			Experience: "Taipei major candidate",
		},
		models.CandidateCard{
			ID:    "2",
			Name:  "Yao",
			Photo: "",
			Party: models.PartyCard{
				ID:     "2",
				Name:   "DPP",
				Emblem: "",
			},
			Experience: "Taipei major candidate",
		},
		models.CandidateCard{
			ID:    "3",
			Name:  "Lin",
			Photo: "",
			Party: models.PartyCard{
				ID:     "3",
				Name:   "NPP",
				Emblem: "",
			},
			Experience: "Taipei legislator",
		},
	}
	c.JSON(http.StatusOK, r)
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
	db, err := gorm.Open("mysql", "vote2020:vote2020@tcp(35.241.81.102:3306)/vote2020?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	id := c.Param("id")
	fmt.Println(id)

	c.String(http.StatusOK, "record")
}
