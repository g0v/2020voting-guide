package main

// PartyCard is the simple version of party information
type PartyCard struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Emblem string `json:"emblem"`
}

// CandidateCard is the simple version of candidate information
type CandidateCard struct {
	ID         string    `json:"id"`
	Name       string    `json:"name"`
	Photo      string    `json:"photo"`
	Party      PartyCard `json:"party"`
	Experience string    `json:"experience"`
}

// CandidateCards is array of CandidateCard
type CandidateCards []CandidateCard

// Candidate is this candidate's profile
type Candidate struct {
	ID                    string    `json:"id"`
	Name                  string    `json:"name"`
	Photo                 string    `json:"photo"`
	Party                 PartyCard `json:"party"`
	Age                   int       `json:"age"`
	BornIn                string    `json:"bornIn"`
	EducationalBackground []string  `json:"educationalBackground"`
	Experiences           []string  `json:"experiences"`
	Politics              string    `json:"politics"`
}
