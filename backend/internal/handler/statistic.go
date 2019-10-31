package handler

import (
	"fmt"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"

	"github.com/gin-gonic/gin"
)

type StatisticResp struct {
	Name string
	Statistics       []StatisticObj `json:"statistics"`
}

type StatisticObj struct {
	Term int16
	StatisticType string
	DataType string
	Key string
	Value int16
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
	fmt.Print(name, term)
	var statistic StatisticResp
	var personalStatisticDb []db.Statistic
	statistic.Name = name
	db.MySQL.Where("name = ? AND term = ?", name, term).Find(&personalStatisticDb)
	statistic.Statistics = []StatisticObj{}
	for _, statisticObj := range personalStatisticDb {
		fmt.Println(statisticObj)
		statistic.Statistics = append(statistic.Statistics, StatisticObj{
			statisticObj.Term,
			statisticObj.StatisticType,
			statisticObj.DataType,
			statisticObj.Key,
			statisticObj.Value,

		})
	}
	c.JSON(http.StatusOK, statistic)
}