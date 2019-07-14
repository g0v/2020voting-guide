package main

import (
	_ "github.com/bangyuwen/2020voting-guide/backend/docs"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.GET("/version", VersionHandler)
	r.GET("/candidates/constituency/:constituency", ListCandidatesByConstituencyHandler)
	r.GET("/candidate/:id", GetCandidateByIdHandler)
	r.GET("/candidate/:id/record", GetCandidateRecordByIdHandler)

	return r
}
