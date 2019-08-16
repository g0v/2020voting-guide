from db import Candidate, Legislator
from peewee import fn
import re


def tag_current_candidate():
    query = Legislator.select(Legislator.name).where(Legislator.term == "09", Legislator.leaveFlag == "否")
    names = [re.match(r"[\u4e00-\u9fff|．]{2,}", row.name)[0] for row in query]
    print(f"current legislators: {names}")
    query = Candidate.update(currentLegislator=True).where(Candidate.name.in_(names))
    query.execute()


def tag_history_candidate():
    query = Legislator.select(Legislator.name)
    names = [re.match(r"[\u4e00-\u9fff|．]{2,}", row.name)[0] for row in query]
    print(f"history legislators: {names}")
    query = Candidate.update(historyLegislator=True).where(Candidate.name.in_(names))
    query.execute()


def update_last_term():
    query = Legislator.select(Legislator.name, fn.max(Legislator.term).alias("last_term")).group_by(Legislator.name)
    for legislator in query:
        Candidate.update(lastTerm=legislator.last_term).where(Candidate.name == legislator.name).execute()


if __name__ == "__main__":
    tag_current_candidate()
    tag_history_candidate()
    update_last_term()
