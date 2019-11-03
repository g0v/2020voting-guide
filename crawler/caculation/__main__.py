import re

from peewee import fn

from db import Candidate, Legislator, Sitting
from util import roc_to_common_era


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


def update_photo():
    latest_id = Legislator.select(Legislator.id).group_by(Legislator.name).order_by(Legislator.term.desc())
    query = Legislator.select(Legislator.name, Legislator.term, Legislator.picUrl).where(Legislator.id.in_(latest_id))

    for legislator in query:
        Candidate.update(picUrl=legislator.picUrl).where(
            Candidate.name == legislator.name, Candidate.lastTerm == legislator.term
        ).execute()


def update_sitting_rate():
    def is_participatable_meeting(meeting_date: str, onboard_date: str, leave_date: str) -> bool:
        if leave_date:
            return leave_date >= meeting_date >= onboard_date
        else:
            return meeting_date >= onboard_date

    legislators = Legislator.select(Legislator.name, Legislator.onboardDate, Legislator.leaveDate).where(
        Legislator.term == "09"
    )
    valid_meeting_unit = ["全院委員會", "議事處會務科", "院會"]
    valid_meetings = Sitting.select().where(
        Sitting.meetingUnit.in_(valid_meeting_unit), Sitting.attendLegislator.is_null(False), Sitting.term == "09"
    )
    total_valid_meeting = len(valid_meeting_unit)
    print("total_valid_meeting: ", total_valid_meeting)

    for legislator in legislators:
        name = legislator.name
        participatable_meetings = [
            meeting
            for meeting in valid_meetings
            if is_participatable_meeting(
                roc_to_common_era(meeting.meetingDateDesc[:9]), legislator.onboardDate, legislator.leaveDate
            )
        ]

        participat_meetings = [meeting for meeting in participatable_meetings if name in meeting.attendLegislator]
        print(
            name,
            len(participat_meetings),
            len(participatable_meetings),
            len(participat_meetings) / len(participatable_meetings),
        )
        Legislator.update(sittingNum=len(participat_meetings), maxSittingNum=len(participatable_meetings)).where(
            Legislator.name == name, Legislator.term == "09"
        ).execute()


if __name__ == "__main__":
    tag_current_candidate()
    tag_history_candidate()
    update_last_term()
    update_photo()
    update_sitting_rate()
