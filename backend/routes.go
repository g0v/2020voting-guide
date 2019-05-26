package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Route struct {
	Name    string
	Method  string
	Path    string
	Handler http.HandlerFunc
}

type Routes []Route

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		router.Methods(route.Method).Path(route.Path).Name(route.Name).Handler(route.Handler)
	}

	return router
}

var routes = Routes{
	Route{
		"ListLegislators",
		"GET",
		"/legislators",
		ListLegislatorsHandler,
	},
}
