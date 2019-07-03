package main

// CountyCard is the simple version of county information
type CountyCard struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Emblem string `json:"emblem"`
}

// CandidateCard is the simple version of candidate information
type CandidateCard struct {
	ID         string     `json:"id"`
	Name       string     `json:"name"`
	Photo      string     `json:"photo"`
	County     CountyCard `json:"county"`
	Experience string     `json:"experience"`
}

// CandidateCards is array of CandidateCard
type CandidateCards []CandidateCard

// Candidate is this candidate's profile
type Candidate struct {
	ID                    string     `json:"id"`
	Name                  string     `json:"name"`
	Photo                 string     `json:"photo"`
	County                CountyCard `json:"county"`
	Age                   int        `json:"age"`
	BornIn                string     `json:"bornIn"`
	EducationalBackground []string   `json:"educationalBackground"`
	Experiences           []string   `json:"experiences"`
	Politics              string     `json:"politics"`
}

/*
package main

type Legislator struct {
	Name string `json:"name"`
	Age  int    `json:"age"`:w

}

type Legislators []Legislator
*/
