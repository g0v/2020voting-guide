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

// Bill is the ORM of bill2 table for gorm usage
type Bill struct {
	BillNo          string `gorm:"column:billNo"`
	Name            string
	Date            string
	Category        string
	BillOrg         string `gorm:"column:billOrg"`
	BillProposer    string `gorm:"column:billProposer"`
	BillCosignatory string `gorm:"column:billCosignatory"`
	BillStatus      string `gorm:"column:billStatus"`
	PdfURL          string `gorm:"column:pdfUrl"`
	CaseOfAction    string `gorm:"column:caseOfAction"`
}

// BillDescription is some description for bill
type BillDescription struct {
	Bill            string
	BillNo          string `gorm:"column:billNo"`
	SelectTerm      string `gorm:"column:selectTerm"`
	Term            string
	SessionPeriod   string `gorm:"column:sessionPeriod"`
	SessionTimes    string `gorm:"column:sessionTimes"`
	DocNo           string `gorm:"column:docNo"`
	LawCompareTitle string `gorm:"column:lawCompareTitle"`
	Description     string
	ActiveLaw       string `gorm:"column:activeLaw"`
	ReviseLaw       string `gorm:"column:reviseLaw"`
	DocURL          string `gorm:"column:docUrl"`
	MeetingTimes    string `gorm:"column:meetingTimes"`
}

// TableName changes the name of table
func (BillDescription) TableName() string {
	return "billdescription"
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
