package models

// PartyCard is the simple version of party information
type PartyCard struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Emblem string `json:"emblem"`
}

// CandidateCard is the simple version of candidate information
type CandidateCard struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	PicURL       string `gorm:"column:picUrl" json:"picUrl"`
	Party        string `json:"party"`
	Experience   string `json:"experience"`
	Constituency string `json:"constituency"`
}

// CandidateCards is array of CandidateCard
type CandidateCards []CandidateCard

// Candidate api for candidate
type Candidate struct {
	Name                   string `json:"name"`
	Photo                  string `json:"photo"`
	County                 string `json:"county"`
	Constituency           string `json:"constituency"`
	Party                  string `json:"party"`
	Age                    int    `json:"age"`
	LastTerm               string `json:"lastTerm"`
	LastTermYear           string `json:"lastTermYear"`
	Educations             string `json:"educations"`
	Experiences            string `json:"experiences"`
	Politics               string `json:"politics"`
	SittingRate            string `json:"sittingRate"`
	InterpellationRate     string `json:"interpellationRate"`
	InterpellationNum      string `json:"interpellationNum"`
	MaxInterpellationNum   string `json:"maxInterpellationNum"`
	InterpellationCategory string `json:"interpellationCategory"`
	BillNum                string `json:"billNum"`
	BillNumCategory        string `json:"billNumCategory"`
	PoliticalContribution  string `json:"politicalContribution"`
	OtherCandidate         string `json:"otherCandidate"`
	Bills                  []Bill `json:"bills"`
}

// Party api for party
type Party struct {
	Name  string `json:"name"`
	Bills []Bill `json:"bills"`
}

// Bill api in candidate
type Bill struct {
	Name            string `json:"name"`
	BillNo          string `json:"billNo"`
	ProposerType    string `json:"proposerType"`
	Description     string `json:"description"`
	Date            string `json:"date"`
	Category        string `json:"category"`
	BillOrg         string `json:"billOrg"`
	BillProposer    string `json:"billProposer"`
	BillCosignatory string `json:"billCosignatory"`
	BillStatus      string `json:"billStatus"`
	PdfURL          string `json:"pdfUrl"`
	CaseOfAction    string `json:"caseOfAction"`
	Vernacular      string `json:"vernacular"`
}

type Description struct {
	Bill        string `json:"bill"`
	Description string `json:"description"`
	ActiveLaw   string `json:"activeLaw"`
	ReviseLaw   string `json:"reviseLaw"`
}

type BillAPI struct {
	Bill         Bill          `json:"bill"`
	Descriptions []Description `json:"descriptions"`
}

type StatisticResp struct {
	Name                   string              `json:"name"`
	SittingRate            float32             `json:"sittingRate"`
	InterpellationRate     int                 `json:"interpellationRate"`
	InterpellationNum      int                 `json:"interpellationNum"`
	BillProposalCategory   []StatisticCategory `json:"billProposal"`
	InterpellationCategory []StatisticCategory `json:"interpellation"`
	Contribution           struct {
		TotalIncome                     int `json:"totalIncome"`
		PersonalContributeion           int `json:"personalContributeion"`
		ProfitableContributeion         int `json:"profitableContributeion"`
		PartyContributeion              int `json:"partyContributeion"`
		CivilOrganizationsContributeion int `json:"civilOrganizationsContributeion"`
		AnonymousContributeion          int `json:"anonymousContributeion"`
		OtherContributeion              int `json:"otherContributeion"`
		OverThrityThousandContribute    int `json:"overThrityThousandContribute"`
		TotalExpense                    int `json:"totalExpense"`
	}
}

type StatisticCategory struct {
	Name  string `json:"name"`
	Term  int    `json:"term"`
	Count int    `json:"count"`
}
