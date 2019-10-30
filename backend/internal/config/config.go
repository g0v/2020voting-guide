package config

import (
	"os"

	"github.com/joho/godotenv"
)

type mySQLConfig struct {
	Host     string
	User     string
	Password string
	DB       string
}

var (
	// MySQL is the config of MySQL DB
	MySQL         mySQLConfig
	VernacularKey string
)

func init() {
	godotenv.Load()

	MySQL.Host = os.Getenv("MYSQL_HOST")
	MySQL.User = os.Getenv("MYSQL_USER")
	MySQL.Password = os.Getenv("MYSQL_PASSWORD")
	MySQL.DB = os.Getenv("MYSQL_DB")
	VernacularKey = os.Getenv("VERNACULAR_KEY")
}
