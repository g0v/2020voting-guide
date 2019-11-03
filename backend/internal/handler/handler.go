package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// VersionHandler show swagger version
// @Summary 2020 Voting Guide Service Version
// @Success 200 {string} string "X.X.X"
// @Failure 500 "fail"
// @Router /api/version [get]
func VersionHandler(c *gin.Context) {
	c.String(http.StatusOK, "0.0.1")
}
