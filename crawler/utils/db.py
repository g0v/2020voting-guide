from os import environ

from peewee import BooleanField, CharField, IntegerField, Model, MySQLDatabase, SmallIntegerField, TextField

USER = environ["MYSQL_USER"]
PASSWORD = environ["MYSQL_PASSWORD"]
HOST = environ["MYSQL_HOST"]
DB = environ["MYSQL_DB"]

mysql_db = MySQLDatabase(DB, user=USER, password=PASSWORD, host=HOST, port=3306)


class BaseModel(Model):
    class Meta:
        database = mysql_db


class Candidate(BaseModel):
    name = CharField()
    party = CharField(null=True)
    constituency = CharField()
    wiki = CharField()
    picUrl = CharField(null=True)
    wikidataPicUrl = CharField(null=True)
    currentLegislator = BooleanField(default=False)
    historyLegislator = BooleanField(default=False)
    lastTerm = CharField(null=True)
    dateOfBirth = CharField(null=True)
    wikidataDateOfBirth = CharField(null=True)
    age = SmallIntegerField(null=True)


class Legislator(BaseModel):
    name = CharField()
    ename = CharField()
    picUrl = CharField(null=True)
    sex = CharField()
    party = CharField()
    degree = TextField(null=True)
    experience = TextField(null=True)
    term = CharField()
    areaName = CharField()
    committee = TextField(null=True)
    partyGroup = CharField()
    county = CharField(null=True)
    onboardDate = CharField()
    leaveFlag = CharField()
    leaveReason = CharField(null=True)
    leaveDate = CharField(null=True)
    attendance_rate = CharField(null=True)


class Sitting(BaseModel):
    sessionTimes = CharField()
    jointCommittee = CharField(null=True)
    sessionPeriod = CharField()
    meetingContent = TextField(null=True)
    meetingNo = CharField()
    selectTerm = CharField()
    meetingName = CharField()
    term = CharField()
    meetingDateDesc = CharField()
    coChairman = CharField(null=True)
    meetingUnit = CharField()
    meetingTimes = CharField()
    meetingRoom = CharField(null=True)
    attendLegislator = TextField(null=True)


class Party(BaseModel):
    name = CharField()
    chairman = CharField()
    logo = CharField()
    voteNum = IntegerField()
    voteRate = CharField()
    electedPersonNum = IntegerField()
    electedPerson = CharField()


class Bill(BaseModel):
    billNo = CharField()
    name = CharField()
    proposer = TextField(null=True)
    cosignatory = TextField(null=True)
    pdf = CharField(null=True)
    term = CharField()
    sessionPeriod = CharField()
    status = CharField()
