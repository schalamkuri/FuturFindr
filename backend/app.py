# This app is inspired by GeoJobs's implementation. Their repo is here:
# https://gitlab.com/sarthaksirotiya/cs373-idb

from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import literal_column
from sqlalchemy.sql import text, column, desc
from models import app, db, Job, College, HousingUnit, HousingUnitImage
from schema import job_schema, housing_unit_schema, college_schema, housing_unit_img_schema
import json

DEFAULT_PAGE_SIZE = 9
DEFAULT_NEARBY_RETURNED = 3
DEFAULT_NEARBY_RADIUS = 500

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

    # also return nearby housing
    temp1 = get_nearby_housing(result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED)
    result.update({"nearby_housing": temp1})

    # also return nearby jobs
    temp2 = get_nearby_jobs(result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED)
    result.update({"nearby_jobs": temp2})

    return jsonify({"data": result})

@app.route("/housing/<string:instance_id>")
def get_housing_unit(instance_id):
    house = HousingUnit.query.filter_by(id=instance_id).first()
    if house == None:
        return Response(json.dumps({"error": "Invalid housing unit ID"}), mimetype="application/json")
    result = housing_unit_schema.dump(house)

     # also return nearby colleges
    temp1 = get_nearby_colleges(result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED)
    result.update({"nearby_colleges": temp1})

    # also return nearby jobs
    temp2 = get_nearby_jobs(result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED)
    result.update({"nearby_jobs": temp2})

    return jsonify({"data": result})

@app.route("/jobs/<int:instance_id>")
def get_job(instance_id):
    job = Job.query.filter_by(id=instance_id).first()
    if job == None:
        return Response(json.dumps({"error": "Invalid job ID"}), mimetype="application/json")
    result = job_schema.dump(job)

    # also return nearby colleges
    temp1 = get_nearby_colleges(result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED)
    result.update({"nearby_colleges": temp1})

    # also return nearby housing
    temp2 = get_nearby_housing(result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED)
    print(temp2)
    result.update({"nearby_housing_units": temp2})

    return jsonify({"data": result})

def paginate_helper(page_num, per_page, query):
    return query.paginate(page=page_num, per_page=(DEFAULT_PAGE_SIZE if per_page is None else per_page), \
                          error_out=False).items


# Helper methods for returning nearby model instances
# inspired by StudySpots https://gitlab.com/jakem02/cs373-idb/-/blob/main/backend/model_functions.py

def get_nearby_colleges(lat, lng, num):
    temp = (
        db.session.query(
        College.name,
        College.id,
        College.latitude,
        College.longitude,
        literal_column(
            "SQRT(POW(69.1 * (latitude - " + str(lat) + "), 2) + POW(69.1 * ("
            + str(lng) + " - longitude) * COS(latitude / 57.3), 2))").label("distance"),
    ).order_by("distance").subquery()
    )
    nearby_colleges = db.session.query(temp).filter(text("distance<" + str(DEFAULT_NEARBY_RADIUS))).all()
    if num > 0:
        nearby_colleges = nearby_colleges[:num]
    return college_schema.dump(nearby_colleges, many = True)

def get_nearby_housing(lat, lng, num):
    temp = (
        db.session.query(
        HousingUnit.address,
        HousingUnit.property_type,
        HousingUnit.id,
        HousingUnit.latitude,
        HousingUnit.longitude,
        literal_column(
            "SQRT(POW(69 * (latitude - " + str(lat) + "), 2) + POW(69 * ("
            + str(lng) + " - longitude) * COS(latitude / 57), 2))").label("distance"),
        ).order_by("distance").subquery()
    )
    nearby_housing = db.session.query(temp).filter(text("distance<" + str(DEFAULT_NEARBY_RADIUS))).all()
    if num > 0:
        nearby_housing = nearby_housing[:num]
    return housing_unit_schema.dump(nearby_housing, many = True)

def get_nearby_jobs(lat, lng, num):
    temp = (
        db.session.query(
        Job.title,
        Job.id,
        Job.latitude,
        Job.longitude,
        literal_column(
            "SQRT(POW(69.1 * (latitude - " + str(lat) + "), 2) + POW(69.1 * ("
            + str(lng) + " - longitude) * COS(latitude / 57.3), 2))").label("distance"),
    ).order_by("distance").subquery()
    )
    nearby_jobs = db.session.query(temp).filter(text("distance<" + str(DEFAULT_NEARBY_RADIUS))).all()
    if num > 0:
        nearby_jobs = nearby_jobs[:num]
    return job_schema.dump(nearby_jobs, many = True)


# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)