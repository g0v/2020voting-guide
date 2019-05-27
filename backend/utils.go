package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

func readJSON(county string) (Legislators, error) {
	filename := fmt.Sprintf("./%s.json", county)
	var legislators []Legislator
	data, err := ioutil.ReadFile(filename)

	if err != nil {
		fmt.Println(err)
		return legislators, err
	}

	err = json.Unmarshal(data, &legislators)

	if err != nil {
		fmt.Println(err)
		return legislators, err
	}

	return legislators, nil
}
