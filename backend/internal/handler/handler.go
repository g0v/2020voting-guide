package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary 2020 Voting Guide Service Version
// @Success 200 {string} string "X.X.X"
// @Failure 500 "fail"
// @Router /api/version [get]
func VersionHandler(c *gin.Context) {
	c.String(http.StatusOK, "0.0.1")
}

// @Summary get records of candidate by name
// @Description get records of candidate by name
// @Accept json
// @Product string
// @Param name path string ture "Name"
// @Success 200 {string} string "record"
// @Router /api/candidate/{name}/record [get]
func GetCandidateRecordByIdHandler(c *gin.Context) {

	name := c.Param("name")
	fmt.Println(name)

	c.String(http.StatusOK, "record")
}
