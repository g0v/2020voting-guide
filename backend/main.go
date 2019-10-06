package main

import (
	_ "github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/g0v/2020voting-guide/backend/internal/db"
	"github.com/g0v/2020voting-guide/backend/internal/routes"
)

// @title 2020 Voting Guide
// @version 0.0.1
// @description 2020 Voting Guide Backend
func main() {
	// gin.SetMode(gin.DebugMode)
	db.Setup()
	defer db.MySQL.Close()
	r := routes.SetupRouter()
	r.Run(":8080")
}
