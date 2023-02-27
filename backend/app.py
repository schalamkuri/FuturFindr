from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import app, db, Job, College, HousingUnit
from schema import job_schema, housing_unit_schema, college_schema, housing_unit_img_schema, college_img_schema
import json


def main():
    app = flask.Flask(__name__)

if __name__ == "__main__":
    main()

@app.route("/")
def home():
    try:
        db.session.query(column("1")).from_statement(text("SELECT 1")).all()
        return "<h1>FuturFindr API</h1>"
    except Exception as e:
        top = "<h1>An exception has occurred.</h1>"
        bottom = "<p>" + str(e) + "</p>"
        return top + bottom
