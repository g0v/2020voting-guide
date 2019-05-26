package main

type Legislator struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

type Legislators []Legislator
