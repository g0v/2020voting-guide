from os import environ
from peewee import MySQLDatabase, Model, CharField, BooleanField

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
    consistuency = CharField()
    current_legislator = BooleanField(default=False)
