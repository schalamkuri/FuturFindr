# This app is inspired by GeoJobs's implementation. Their repo is here:
# https://gitlab.com/sarthaksirotiya/cs373-idb

from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text, column, desc
from models import app, db, Job, College, HousingUnit, HousingUnitImage
from schema import job_schema, housing_unit_schema, college_schema, housing_unit_img_schema, college_img_schema
import json

DEFAULT_PAGE_SIZE = 9

# Home page
@app.route("/")
def home():
    return "<h1>FuturFindr API</h1>"


# Functions for returning lists of models

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


# Functions for returning singular instances of models

@app.route("/colleges/<int:instance_id>")
def get_college(instance_id):
    college = College.query.filter_by(id=instance_id).first()
    if college == None:
        return Response(json.dumps({"error": "Invalid college ID"}), mimetype="application/json")
    result = college_schema.dump(college)
    college_images = college_img_schema.dump(college.images, many=True)
    result.update({"images": college_images})
    return jsonify({"data": result})

@app.route("/housing/<string:instance_id>")
def get_housing_unit(instance_id):
    house = HousingUnit.query.filter_by(id=instance_id).first()
    if house == None:
        return Response(json.dumps({"error": "Invalid housing unit ID"}), mimetype="application/json")
    result = housing_unit_schema.dump(house)

    # also return a nearby job
    temp1 = Job.query.filter_by(city=result["city"]).first()
    nearby_job = job_schema.dump(temp1)
    result.update({"nearby_job" : nearby_job})

    # also return a nearby college
    # temp2 = College.query.filter_by(city=result["city"]).first()
    # nearby_college = college_schema.dump(temp2)
    # result.update({"nearby_college" : nearby_college})

    return jsonify({"data": result})

@app.route("/jobs/<int:instance_id>")
def get_job(instance_id):
    job = Job.query.filter_by(id=instance_id).first()
    if job == None:
        return Response(json.dumps({"error": "Invalid job ID"}), mimetype="application/json")
    result = job_schema.dump(job)

    # also return a nearby housing unit
    temp1 = Job.query.filter_by(city=result["city"]).first()
    nearby_job = job_schema.dump(temp1)
    result.update({"nearby_housing_unit" : nearby_job})

    return jsonify({"data": result})

# google maps api key "AIzaSyB--bIa6UPVD5X1MRBveqR6A7Hy4-tMfSo"

def paginate_helper(page_num, per_page, query):
    return query.paginate(page=page_num, per_page=(DEFAULT_PAGE_SIZE if per_page is None else per_page), \
                          error_out=False).items

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


