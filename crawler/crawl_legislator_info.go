/*
This is the go version of getting the opendata response
*/

package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"fmt"
	"strconv"
)

type Payload struct {
	id         string
	selectTerm string
}

func crawlPage(url string, filePath string) {
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	responseBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile(filePath, responseBody, 0644)
	if err != nil {
		log.Fatal(err)
	}

	log.Print(fmt.Sprintf("[INFO] Finish crawling %s to %s", url, filePath))
}

func getFullUrl(baseUrl string, payload Payload) string{
	req, err := http.NewRequest("GET", baseUrl, nil)
	if err != nil {
		log.Fatal(err)
	}

	q := req.URL.Query()
	q.Add("id", payload.id)
	q.Add("selectTerm", payload.selectTerm)
	req.URL.RawQuery = q.Encode()

	return req.URL.String()
}

func crawlLegislatorInfoPages(id string, payload Payload, pageNum int) {
	url := "http://data.ly.gov.tw/odw/openDatasetJson.action"
	for page := 1; page <= pageNum; page++ {
		
		fullUrl := getFullUrl(url, payload)
		filePath := fmt.Sprintf("../data/%s_page%s.json", id, strconv.Itoa(page))
		
		crawlPage(fullUrl, filePath)
	}
}

func main() {
	crawlLegislatorInfoPages("history_legislator_info", Payload{id: "16", selectTerm: "all"}, 2)
	crawlLegislatorInfoPages("current_legislator_info", Payload{id: "9", selectTerm: "all"}, 1)
}
