from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text, column, desc
from models import app, db, Job, College, HousingUnit
from schema import job_schema, housing_unit_schema, college_schema, housing_unit_img_schema, college_img_schema
import json

DEFAULT_PAGE_SIZE = 6

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

@app.route("/")
def home():
    return "<h1>FuturFindr API</h1>"

@app.route("/colleges")
def get_colleges():
    # get api call arguments
    page_num = request.args.get("page", type=int)
    per_page = request.args.get("per_page", type=int)
    query = db.session.query(College)
    count = query.count()
    
    # pagination
    if page_num is not None:
        query = paginate_helper(page_num, per_page, query)

    # return result
    result = college_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})

@app.route("/housing")
def get_housing():
    # get api call arguments
    page_num = request.args.get("page", type=int)
    per_page = request.args.get("per_page", type=int)
    query = db.session.query(HousingUnit)
    count = query.count()
    
    # pagination
    if page_num is not None:
        query = paginate_helper(page_num, per_page, query)

    # return result
    result = housing_unit_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})
@app.route("/jobs")

def get_jobs():
    # get api call arguments
    page_num = request.args.get("page", type=int)
    per_page = request.args.get("per_page", type=int)
    query = db.session.query(Job)
    count = query.count()
    
    # pagination
    if page_num is not None:
        query = paginate_helper(page_num, per_page, query)

    # return result
    result = job_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})


def paginate_helper(page_num, per_page, query):
    if per_page is None:
        per_page = DEFAULT_PAGE_SIZE
    return query.paginate(page=page_num, per_page=per_page, error_out=False).items


