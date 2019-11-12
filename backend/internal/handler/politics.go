package handler

import (
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
)

// GetPoliticsByNameHandler return politics info
// @Summary get 2016 politics info by name
// @Description get 2016 politics info by name
// @Accept json
// @Produce json
// @Param name path string true "Name"
// @Success 200 {object} models.Politics
// @Router /api/politics/{name} [get]
func GetPoliticsByNameHandler(c *gin.Context) {
	name := c.Param("name")

	var politicsResp models.PoliticsResp
	var personalPoliticsDb db.Politics

	politicsResp.Name = name

	db.MySQL.Where("name = ?", name).First(&personalPoliticsDb)
	politicsResp.Politics = personalPoliticsDb.Politics

	c.JSON(http.StatusOK, politicsResp)
}
