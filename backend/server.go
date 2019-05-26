package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type Legislator struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	http.HandleFunc("/legislators", listLegislatorsHandler)
	http.ListenAndServe(":8000", nil)
}

func listLegislatorsHandler(w http.ResponseWriter, r *http.Request) {
	counties := r.URL.Query()["county"]
	if len(counties) != 1 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	legislators, _ := readJson(strings.ToLower(counties[0]))
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(legislators)
}

func readJson(county string) ([]Legislator, error) {
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
