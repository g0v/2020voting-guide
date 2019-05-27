package main

import (
	"encoding/json"
	"net/http"
	"strings"
)

func ListLegislatorsHandler(w http.ResponseWriter, r *http.Request) {
	counties := r.URL.Query()["county"]
	if len(counties) != 1 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	legislators, err := readJSON(strings.ToLower(counties[0]))

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(legislators)
}
