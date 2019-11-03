from os import environ

from peewee import BooleanField, CharField, FloatField, IntegerField, Model, MySQLDatabase, SmallIntegerField, TextField

USER = environ["MYSQL_USER"]
PASSWORD = environ["MYSQL_PASSWORD"]
HOST = environ["MYSQL_HOST"]
DB = environ["MYSQL_DB"]

mysql_db = MySQLDatabase(DB, user=USER, password=PASSWORD, host=HOST, port=3306)


class BaseModel(Model):
    class Meta:
        database = mysql_db


class Candidate(BaseModel):
    name = CharField(index=True)
    party = CharField(null=True)
    constituency = CharField()
    wiki = CharField(null=True)
    picUrl = CharField(null=True)
    wikidataPicUrl = TextField(null=True)
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
    sittingNum = SmallIntegerField(null=True)
    maxSittingNum = SmallIntegerField(null=True)


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
    name = CharField()
    category = CharField(null=True)
    selectTerm = CharField()
    term = CharField()
    sessionPeriod = CharField()
    sessionTimes = CharField()
    billNo = CharField()
    billOrg = CharField()
    billProposer = TextField(null=True)
    billCosignatory = TextField(null=True)
    pdf = CharField(null=True)
    billStatus = CharField()
    docUrl = CharField(null=True)
    pdfUrl = CharField(null=True)
    meetingTimes = CharField(null=True)
    billName = CharField()
    caseOfAction = TextField()


class Bill2(BaseModel):
    name = CharField()
    date = CharField()
    term = CharField()
    sessionPeriod = CharField()
    proposer = TextField()
    cosignatory = TextField()
    status = CharField()
    category = CharField(null=True)


class BillDescription(BaseModel):
    billNo = CharField(index=True)
    bill = CharField()
    selectTerm = CharField()
    term = CharField()
    sessionPeriod = CharField()
    sessionTimes = CharField()
    docNo = CharField()
    lawCompareTitle = CharField()
    description = TextField(null=True)
    activeLaw = TextField(null=True)
    reviseLaw = TextField(null=True)
    docUrl = TextField()
    meetingTimes = CharField()
