package db

import (
	"fmt"
	"log"

	"github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" // standard usage
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
	MySQL.SingularTable(true)
	// MySQL.LogMode(true)

	if err != nil {
		m := fmt.Sprintf("%s@tcp(%s:3306)/%s",
			config.MySQL.User,
			config.MySQL.Host,
			config.MySQL.DB,
		)
		log.Print(m)
		log.Fatalf("Connect DB error: %v", err)
	}
}

// Bill2 is the ORM of bill2 table for gorm usage
type Bill2 struct {
	ID            string
	Name          string
	Date          string
	Term          string
	SessionPeriod string
	Proposer      string
	Cosignatory   string
	Status        string
	Category      string
}

// Candidate is the ORM of candidate table for gorm usage
type Candidate struct {
	Name                string
	Party               string
	Constituency        string
	Wiki                string
	PicURL              string `gorm:"column:picUrl"`
	WikidataPicURL      string `gorm:"column:wikidataPicUrl"`
	CurrentLegislator   string
	HistoryLegislator   string
	LastTerm            string
	DateOfBirth         string
	WikidataDateOfBirth string
	Age                 int16
}
