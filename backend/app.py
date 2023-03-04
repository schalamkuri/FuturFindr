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
    #try:
        #db.session.query(column("1")).from_statement(text("SELECT 1")).all()
        return "<h1>FuturFindr API</h1>"
    #except Exception as e:
        #top = "<h1>An exception has occurred.</h1>"
        #bottom = "<p>" + str(e) + "</p>"
        #return top + bottom

@app.route("/jobs")
def get_jobs():
    # get api call arguments
    page_num = request.args.get("page", type=int)
    per_page = request.args.get("per_page", type=int)
    query = db.session.query(Job)
    count = query.count()
    
    if page_num is not None:
        query = paginate_helper(page_num, per_page, query)
    result = job_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})

def paginate_helper(page_num, per_page, query):
    if per_page is None:
        per_page = DEFAULT_PAGE_SIZE
    return query.paginate(page=page_num, per_page=per_page, error_out=False).items


