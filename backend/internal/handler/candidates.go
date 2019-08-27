package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
)

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
	db.MySQL.Table("candidates").Select("candidates.name, candidates.party, personal_info_history.experience, personal_info_history.term").Where("candidates.name = ?", name).Joins("left join personal_info_history on candidates.name = personal_info_history.name").Order("personal_info_history.term desc").Find(&candidate)

	c.JSON(http.StatusOK, candidate)
}
