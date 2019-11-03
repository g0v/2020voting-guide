package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// GetStatisticByNameHandler return statistic info
// @Summary get the statistic info by name, and can filter by term
// @Description get the statistic info by name, and can filter by term
// @Accept json
// @Produce json
// @Param name path string true "Name"
// @Success 200 {object} models.Statistic
// @Router /api/statistic/{name} [get]
func GetStatisticByNameHandler(c *gin.Context) {
	name := c.Param("name")
	term := c.DefaultQuery("term", "9")

	fmt.Println(name, term)

	var statisticResp models.StatisticResp
	var personalStatisticDb []db.Statistic

	statisticResp.Name = name

	db.MySQL.Where("name = ? AND term = ? AND dataType = ?", name, term, "categories").Find(&personalStatisticDb)
	for _, statisticObj := range personalStatisticDb {
		if statisticObj.StatisticType == "interpellation" {
			statisticResp.BillProposalCategory = append(statisticResp.BillProposalCategory, models.StatisticCategory{
				Name:  statisticObj.Key,
				Term:  statisticObj.Term,
				Count: statisticObj.Value,
			})
		}
		if statisticObj.StatisticType == "legal_proposal" {
			statisticResp.InterpellationCategory = append(statisticResp.InterpellationCategory, models.StatisticCategory{
				Name:  statisticObj.Key,
				Term:  statisticObj.Term,
				Count: statisticObj.Value,
			})
		}
	}
	c.JSON(http.StatusOK, statisticResp)
}
