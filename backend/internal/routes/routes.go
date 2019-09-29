package routes

import (
	_ "github.com/g0v/2020voting-guide/backend/docs" // swagger standard usage
	"github.com/g0v/2020voting-guide/backend/internal/handler"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Using frontend as static and default file
	router.Use(static.Serve("/", static.LocalFile("/root/client", true)))
	router.NoRoute(func(c *gin.Context) {
		c.File("/root/client/index.html")
	})

	router.StaticFile("/favicon.ico", "./favicon.ico")

	api := router.Group("/api")
	api.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	api.GET("/version", handler.VersionHandler)
	api.GET("/constituency/:constituency", handler.ListCandidatesByConstituencyHandler)
	api.GET("/candidate/:name", handler.GetCandidateByNameHandler)
	api.GET("/candidate/:name/record", handler.GetCandidateRecordByIDHandler)

	return router
}
