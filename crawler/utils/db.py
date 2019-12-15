from os import environ

from peewee import (BooleanField, CharField, IntegerField, Model,
                    MySQLDatabase, SmallIntegerField, TextField)

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


class ManualCandidate(BaseModel):
    name = CharField(index=True)
    constituency = CharField()
    party = CharField()
    currentLegislator = CharField()
    beenLegislator = CharField()
    dayOfBirth = CharField(null=True)
    age = CharField(null=True)
    photo = TextField(null=True)
    wiki = CharField(null=True)
    fbPage = TextField(null=True)
    fbPersonalPage = TextField(null=True)
    education = CharField(null=True)
    educationConn = CharField(null=True)
    experience = TextField(null=True)
    experienceConn = CharField(null=True)
    politics = TextField(null=True)
    politicsConn = TextField(null=True)
    other = TextField(null=True)


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


class Contribution(BaseModel):
    constituency = CharField(null=True)
    name = CharField()
    constituencyRank = SmallIntegerField()
    voteNum = IntegerField()
    party = CharField()
    voteRate = CharField()
    elected = BooleanField(null=True)
    currentLegislator = BooleanField()
    committee = CharField(null=True)
    sex = CharField()
    yearOfBirth = IntegerField()
    contributeCompanyNum = IntegerField()
    totalIncome = IntegerField()
    personalContributeion = IntegerField()
    personalContributeionRate = CharField()
    profitableContributeion = IntegerField()
    profitableContributeionRate = CharField()
    partyContributeion = IntegerField()
    partyContributeionRate = CharField()
    civilOrganizationsContributeion = IntegerField()
    civilOrganizationsContributeionRate = CharField()
    anonymousContributeion = IntegerField()
    anonymousContributeionRate = CharField()
    otherContributeion = IntegerField()
    otherContributeionRate = CharField()
    overThrityThousandContribute = IntegerField()
    totalExpense = IntegerField()


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
    name = CharField(index=True)
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
    vernacular = CharField()


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


class ProposerCosignatory(BaseModel):
    billNo = CharField(index=True)
    role = CharField()
    name = CharField()


class BillClicks(BaseModel):
    term = CharField()
    sessionPeriod = CharField()
    sessionTimes = CharField()
    name = CharField()
    clicks = IntegerField()


class FB(BaseModel):
    constituency = CharField()
    name = CharField()
    fbPage = CharField()
    fbId = CharField()
    like = CharField(null=True)
    blueCheck = CharField(null=True)
    createdDate = CharField(null=True)
    managerCountry = CharField(null=True)
    nameChangeNum = CharField(null=True)


class CandidateExcel(BaseModel):
    constituency = CharField()
    name = CharField()
    fbPage = CharField()
    fbId = CharField()
    like = CharField(null=True)
    blueCheck = CharField(null=True)
    createdDate = CharField(null=True)
    managerCountry = CharField(null=True)
    nameChangeNum = CharField(null=True)


class Politics(BaseModel):
    name = CharField()
    politics = TextField()


class AD(BaseModel):
    constituency = CharField()
    name = CharField()
    adId = CharField()
    politicalAD = CharField()
    startDate = CharField()
    endDate = CharField()
    content = CharField()


class Vernacular(BaseModel):
    bill_no = CharField()
    vernacular = CharField()
