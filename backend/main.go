package main

// @title 2020 Voting Guide
// @version 0.0.1
// @description 2020 Voting Guide Backend
func main() {
	r := setupRouter()
	r.Run(":9000")
}
