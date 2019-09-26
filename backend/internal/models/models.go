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
	PicURL       string `json:"picUrl"`
	Party        string `json:"party"`
	Experience   string `json:"experience"`
	Constituency string `json:"constituency"`
}

// CandidateCards is array of CandidateCard
type CandidateCards []CandidateCard

// Candidate is this candidate's profile
type Candidate struct {
	ID                    string `json:"id"`
	Name                  string `json:"name"`
	Photo                 string `json:"photo"`
	Party                 string `json:"party"`
	Age                   int    `json:"age"`
	BornIn                string `json:"bornIn"`
	EducationalBackground string `json:"educationalBackground"`
	Experience            string `json:"experience"`
	Politics              string `json:"politics"`
}
