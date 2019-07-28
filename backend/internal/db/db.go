package db

import (
	"fmt"
	"log"

	"github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// MySQL is db object to connect MySQL
var MySQL *gorm.DB

// Setup setup the db connection
func Setup() {
	var err error

	c := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s",
		config.MySQL.User,
		config.MySQL.Password,
		config.MySQL.Host,
		config.MySQL.DB,
	)
	MySQL, err = gorm.Open("mysql", c)

	if err != nil {
		log.Fatalf("Connect DB error: %v", err)
	}
}
