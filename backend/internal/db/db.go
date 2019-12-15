package db

import (
	"fmt"
	"log"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" // standard usage
)

// MySQL is db object to connect MySQL
var MySQL *gorm.DB

// Setup setup the db connection
func Setup() {
	var err error

	c := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?parseTime=true",
		config.MySQL.User,
		config.MySQL.Password,
		config.MySQL.Host,
		config.MySQL.DB,
	)
	MySQL, err = gorm.Open("mysql", c)
	MySQL.SingularTable(true)
	MySQL.LogMode(true)

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

func MigrateDB(c *gin.Context) {
	MySQL.AutoMigrate(&Vernacular{})
	c.JSON(http.StatusOK, "finished")
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
	DocURL          string `gorm:"column:docUrl"`
	PdfURL          string `gorm:"column:pdfUrl"`
	CaseOfAction    string `gorm:"column:caseOfAction"`
	Vernacular      string
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
	CurrentLegislator   bool   `gorm:"column:currentLegislator"`
	HistoryLegislator   string `gorm:"column:historyLegislator"`
	DateOfBirth         string `gorm:"column:dateOfBirth"`
	WikidataDateOfBirth string `gorm:"column:wikidataDateOfBirth"`
	Age                 int
}

type ManualCandidate struct {
	Name                 string
	Constituency         string
	Photo                string
	Party                string
	Age                  int
	CurrentLegislator    bool `gorm:"column:currentLegislator"`
	Education            string
	Experience           string
	Politics             string
	EducationConnection  bool `gorm:"column:educationConnection"`
	ExperienceConnection bool `gorm:"column:experienceConnection"`
	PoliticsConnection   bool `gorm:"column:politicsConnection"`
}

func (ManualCandidate) TableName() string {
	return "manualcandidate"
}

type Legislator struct {
	Name          string
	SittingNum    int `gorm:"column:sittingNum"`
	MaxSittingNum int `gorm:"column:maxSittingNum"`
}

// Vernacular is the ORM of vernacular table for gorm usage
type Vernacular struct {
	gorm.Model
	BillNo     string
	Vernacular string
}

// Statistic is the ORM of statistic table for gorm usage
type Statistic struct {
	Id            int
	Name          string
	Term          int
	StatisticType string `gorm:"column:statisticType"`
	DataType      string `gorm:"column:dataType"`
	Key           string
	Value         int
}

type Contribution struct {
	Name                            string `gorm:"column:name"`
	TotalIncome                     int    `gorm:"column:totalIncome"`
	PersonalContributeion           int    `gorm:"column:personalContributeion"`
	ProfitableContributeion         int    `gorm:"column:profitableContributeion"`
	PartyContributeion              int    `gorm:"column:partyContributeion"`
	CivilOrganizationsContributeion int    `gorm:"column:civilOrganizationsContributeion"`
	AnonymousContributeion          int    `gorm:"column:anonymousContributeion"`
	OtherContributeion              int    `gorm:"column:otherContributeion"`
	OverThrityThousandContribute    int    `gorm:"column:overThrityThousandContribute"`
	TotalExpense                    int    `gorm:"column:totalExpense"`
}

type ProposerCategory struct {
	BillNo string `json:"billNo"`
	Role   string `json:"role"`
	Name   string `json:"name"`
}

type FB struct {
	Name   string `gorm:"column:name" json:"name"`
	FBPage string `gorm:"column:fbPage" json:"fbPage"`
}

type Politics struct {
	Id       int
	Name     string
	Politics string
}
