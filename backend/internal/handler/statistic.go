package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"

	"github.com/gin-gonic/gin"
)

type StatisticResp struct {
	Name                   string     `json:"name"`
	BillProposalCategory   []Category `json:"billProposal"`
	InterpellationCategory []Category `json:"interpellation"`
}

type Category struct {
	Name  string `json:"name"`
	Term  int16  `json:"term"`
	Count int16  `json:"count"`
}

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

	var statisticResp StatisticResp
	var personalStatisticDb []db.Statistic

	statisticResp.Name = name

	db.MySQL.Where("name = ? AND term = ? AND dataType = ?", name, term, "categories").Find(&personalStatisticDb)
	for _, statisticObj := range personalStatisticDb {
		if statisticObj.StatisticType == "interpellation" {
			statisticResp.BillProposalCategory = append(statisticResp.BillProposalCategory, Category{
				statisticObj.Key, statisticObj.Term, statisticObj.Value,
			})
		}
		if statisticObj.StatisticType == "legal_proposal" {
			statisticResp.InterpellationCategory = append(statisticResp.InterpellationCategory, Category{
				statisticObj.Key, statisticObj.Term, statisticObj.Value,
			})
		}
	}
	c.JSON(http.StatusOK, statisticResp)
}
