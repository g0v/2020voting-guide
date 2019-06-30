package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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
// @Success 200 {object} main.CandidateCards
// @Router /candidates/constituency/{constituency} [get]
func ListCandidatesByConstituencyHandler(c *gin.Context) {
	ct := c.Param("constituency")
	fmt.Println(ct)

	r := CandidateCards{
		CandidateCard{
			ID:    "1",
			Name:  "Ding",
			Photo: "",
			County: CountyCard{
				ID:     "1",
				Name:   "KMT",
				Emblem: "",
			},
			Experience: "Taipei major candidate",
		},
		CandidateCard{
			ID:    "2",
			Name:  "Yao",
			Photo: "",
			County: CountyCard{
				ID:     "2",
				Name:   "DPP",
				Emblem: "",
			},
			Experience: "Taipei major candidate",
		},
		CandidateCard{
			ID:    "3",
			Name:  "Lin",
			Photo: "",
			County: CountyCard{
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
// @Success 200 {object} main.Candidate
// @Router /candidate/{id} [get]
func GetCandidateByIdHandler(c *gin.Context) {
	id := c.Param("id")
	fmt.Println(id)

	r := Candidate{
		ID:    "1",
		Name:  "Ding",
		Photo: "",
		County: CountyCard{
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
