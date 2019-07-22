package main

import (
	"github.com/g0v/2020voting-guide/backend/pkg/routes"
)

// @title 2020 Voting Guide
// @version 0.0.1
// @description 2020 Voting Guide Backend
func main() {
	r := routes.SetupRouter()
	r.Run(":9000")
}
