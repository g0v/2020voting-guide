package routes

import (
	_ "github.com/g0v/2020voting-guide/backend/docs" // swagger standard usage
	"github.com/g0v/2020voting-guide/backend/internal/handler"

	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

// SetupRouter is root router
func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.StaticFile("/favicon.ico", "./favicon.ico")

	api := router.Group("/api")

	api.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	api.GET("/version", handler.VersionHandler)
	api.GET("/constituency/:constituency", handler.ListCandidatesByConstituencyHandler)
	api.GET("/candidate/:constituency/:name", handler.GetCandidateByNameHandler)
	api.GET("/party/:name", handler.GetPartyByNameHandler)
	api.GET("/bills/:constituency/:name", handler.ListRelateBills)
	api.GET("/bill/:id", handler.GetBillHandler)
	api.GET("/statistic/:name", handler.GetStatisticByNameHandler)
	api.GET("/fb/:constituency/:name", handler.GetCandidateFB)
	api.GET("/politics/:name", handler.GetPoliticsByNameHandler)

	api.GET("/vernacularlist/:filter", handler.ListVernacular)
	api.GET("/vernacular/:id", handler.GetVernacular)
	api.POST("/vernacular/:id", handler.PostVernacular)
	api.Static("/data", "../data/static")

	return router
}
