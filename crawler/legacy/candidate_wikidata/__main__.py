# pip install sparqlwrapper
# https://rdflib.github.io/sparqlwrapper/

from SPARQLWrapper import JSON, SPARQLWrapper

from db import Candidate
from peewee import DataError


def get_candidates():
    return [candidate.name for candidate in Candidate.select(Candidate.name).group_by(Candidate.name)]


def get_results(endpoint_url, query):
    sparql = SPARQLWrapper(endpoint_url)
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    return sparql.query().convert()


def get_politician_data():
    def parse_result(result):
        return {
            "name": result.get("itemLabel", {}).get("value"),
            "dateOfBirth": result.get("dateOfBirth", {}).get("value"),
            "picUrl": result.get("picUrl", {}).get("value"),
        }

    endpoint_url = "https://query.wikidata.org/sparql"
    query = """SELECT ?item ?itemLabel ?dateOfBirth ?picUrl WHERE {
        ?item wdt:P106 wd:Q82955.
        ?item wdt:P27 wd:Q865.
        OPTIONAL { ?item wdt:P569 ?dateOfBirth. }
        OPTIONAL { ?item wdt:P18 ?picUrl. }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],zh". }
        }"""
    results = get_results(endpoint_url, query)
    politicans = [parse_result(result) for result in results["results"]["bindings"]]
    return politicans


def update_candidate(candidate_data):
    for candidate in candidate_data:
        try:
            Candidate.update(wikidataPicUrl=candidate["picUrl"], wikidataDateOfBirth=candidate["dateOfBirth"]).where(
                Candidate.name == candidate["name"]
            ).execute()
        except DataError as e:
            print(f'Error on candidate: {candidate["name"]}')
            print(e)


if __name__ == "__main__":
    candidate_names = get_candidates()
    politican_data = get_politician_data()
    candidate_data = [politican for politican in politican_data if politican["name"] in candidate_names]
    update_candidate(candidate_data)
