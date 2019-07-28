package routes

import (
	_ "github.com/g0v/2020voting-guide/backend/docs"
	"github.com/g0v/2020voting-guide/backend/internal/handler"

	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.GET("/version", handler.VersionHandler)
	r.GET("/candidates/constituency/:constituency", handler.ListCandidatesByConstituencyHandler)
	r.GET("/candidate/:name", handler.GetCandidateByNameHandler)
	r.GET("/candidate/:name/record", handler.GetCandidateRecordByIdHandler)

	return r
}
