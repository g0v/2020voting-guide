package models

// PartyCard is the simple version of party information
type PartyCard struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Emblem string `json:"emblem"`
}

// CandidateOverview is the simple version of candidate information
type CandidateOverview struct {
	Name              string `json:"name"`
	Photo             string `json:"photo"`
	Party             string `json:"party"`
	Experience        string `json:"experience"`
	CurrentLegislator bool   `json:"currentLegislator"`
}

// Candidate api for candidate
type Candidate struct {
	Name              string `json:"name"`
	Photo             string `json:"photo"`
	Constituency      string `json:"constituency"`
	Party             string `json:"party"`
	Age               int    `json:"age"`
	Education         string `json:"education"`
	Experience        string `json:"experience"`
	Politic           string `json:"politic"`
	CurrentLegislator bool   `json:"currentLegislator"`
	// SittingRate            string `json:"sittingRate"`
	// InterpellationRate     string `json:"interpellationRate"`
	// InterpellationNum      string `json:"interpellationNum"`
	// MaxInterpellationNum   string `json:"maxInterpellationNum"`
	// InterpellationCategory string `json:"interpellationCategory"`
	// BillNum                string `json:"billNum"`
	// BillNumCategory        string `json:"billNumCategory"`
	// PoliticalContribution string `json:"politicalContribution"`
	// OtherCandidate         string `json:"otherCandidate"`
}

// Party api for party
type Party struct {
	Name  string `json:"name"`
	Bills []Bill `json:"bills"`
}

// Bill api in candidate
type Bill struct {
	Name                  string      `json:"name"`
	BillNo                string      `json:"billNo"`
	ProposerType          string      `json:"proposerType"`
	Description           string      `json:"description"`
	Date                  string      `json:"date"`
	Category              string      `json:"category"`
	BillOrg               string      `json:"billOrg"`
	BillProposer          []NameParty `json:"billProposer"`
	BillProposerString    string      `json:"billProposerString"`
	BillCosignatory       []NameParty `json:"billCosignatory"`
	BillCosignatoryString string      `json:"billCosignatoryString"`
	BillStatus            string      `json:"billStatus"`
	PdfURL                string      `json:"pdfUrl"`
	DocURL                string      `json:"docUrl"`
	CaseOfAction          string      `json:"caseOfAction"`
	Vernacular            string      `json:"vernacular"`
}

type NameParty struct {
	Name  string `json:"name"`
	Role  string `json:"role"`
	Party string `json:"party"`
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
	InterpellationNum      int                 `json:"interpellationNum"`
	BillProposalNum        int                 `json:"billProposalNum"`
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
	} `json:"contribution"`
	OtherConstituencyCandidate []StatisticOtherCandidate `json:"otherConstituencyCandidate"`
}

type StatisticOtherCandidate struct {
	Name         string `json:"name"`
	TotalIncome  int    `json:"totalIncome"`
	TotalExpense int    `json:"totalExpense"`
}

type StatisticCategory struct {
	Name  string `json:"name"`
	Term  int    `json:"term"`
	Count int    `json:"count"`
}

type PoliticsResp struct {
	Name     string `json:"name"`
	Politics string `json:"politics"`
}
