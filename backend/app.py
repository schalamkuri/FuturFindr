# This app is inspired by GeoJobs's implementation. Their repo is here:
# https://gitlab.com/sarthaksirotiya/cs373-idb

from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import literal_column, or_
from sqlalchemy.sql import text, column, desc
from models import app, db, Job, College, HousingUnit, HousingUnitImage
from schema import (
    job_schema,
    housing_unit_schema,
    college_schema,
    housing_unit_img_schema,
)
import json
import datetime

DEFAULT_PAGE_SIZE = 9
DEFAULT_NEARBY_RETURNED = 3
DEFAULT_NEARBY_RADIUS = 500

# Home page
@app.route("/")
def home():
    return "<h1>FuturFindr API</h1>"


# Functions for returning search results
# Inspired by GeoJobs - https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/back-end/app.py


@app.route("/search/<string:query>")
def search_all(query):
    parameters = query.split()
    results = {
        **search_colleges(parameters),
        **search_housing(parameters),
        **search_jobs(parameters),
    }
    temp = sorted(results.keys(), key=lambda x: results[x], reverse=True)
    colleges = [college for college in temp if type(college) == College]
    housing = [housing for housing in temp if type(housing) == HousingUnit]
    jobs = [job for job in temp if type(job) == Job]
    college_results = college_schema.dump(colleges, many=True)
    housing_results = housing_unit_schema.dump(housing, many=True)
    job_results = job_schema.dump(jobs, many=True)
    return jsonify(
        {"colleges": college_results, "housing": housing_results, "jobs": job_results}
    )


@app.route("/search/<string:model>/<string:query>")
def search_models(model, query):
    model = model.strip().lower()
    parameters = query.split()
    result = None
    if model == "college":
        results = search_colleges(parameters)
        colleges = sorted(results.keys(), key=lambda x: results[x], reverse=True)
        result = college_schema.dump(colleges, many=True)
    elif model == "housing":
        results = search_housing(parameters)
        housing = sorted(
            results.keys(), key=lambda x: results[x], reverse=True
        )
        result = housing_unit_schema.dump(housing, many=True)
    elif model == "job":
        results = search_jobs(parameters)
        jobs = sorted(results.keys(), key=lambda x: results[x], reverse=True)
        result = job_schema.dump(jobs, many=True)
    else:
        return Response(
            json.dumps({"error": "Invalid model type"}), mimetype="application/json"
        )
    return jsonify({"data": result})


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
        return Response(
            json.dumps({"error": "Invalid college ID"}), mimetype="application/json"
        )
    result = college_schema.dump(college)

    # also return nearby housing
    temp1 = get_nearby_housing(
        result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED
    )
    result.update({"nearby_housing": temp1})

    # also return nearby jobs
    temp2 = get_nearby_jobs(
        result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED
    )
    result.update({"nearby_jobs": temp2})

    return jsonify({"data": result})


@app.route("/housing/<string:instance_id>")
def get_housing_unit(instance_id):
    house = HousingUnit.query.filter_by(id=instance_id).first()
    if house == None:
        return Response(
            json.dumps({"error": "Invalid housing unit ID"}),
            mimetype="application/json",
        )
    result = housing_unit_schema.dump(house)

    # also return nearby colleges
    temp1 = get_nearby_colleges(
        result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED
    )
    result.update({"nearby_colleges": temp1})

    # also return nearby jobs
    temp2 = get_nearby_jobs(
        result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED
    )
    result.update({"nearby_jobs": temp2})

    return jsonify({"data": result})


@app.route("/jobs/<int:instance_id>")
def get_job(instance_id):
    job = Job.query.filter_by(id=instance_id).first()
    if job == None:
        return Response(
            json.dumps({"error": "Invalid job ID"}), mimetype="application/json"
        )
    result = job_schema.dump(job)

    # also return nearby colleges
    temp1 = get_nearby_colleges(
        result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED
    )
    result.update({"nearby_colleges": temp1})

    # also return nearby housing
    temp2 = get_nearby_housing(
        result["latitude"], result["longitude"], DEFAULT_NEARBY_RETURNED
    )
    result.update({"nearby_housing_units": temp2})

    return jsonify({"data": result})


def paginate_helper(page_num, per_page, query):
    return query.paginate(
        page=page_num,
        per_page=(DEFAULT_PAGE_SIZE if per_page is None else per_page),
        error_out=False,
    ).items


# Helper methods for returning nearby model instances
# inspired by StudySpots https://gitlab.com/jakem02/cs373-idb/-/blob/main/backend/model_functions.py

def get_nearby_colleges(lat, lng, num):
    temp = (
        db.session.query(
            College.name,
            College.id,
            College.latitude,
            College.longitude,
            College.admission_rate,
            College.img_url,
            literal_column(
                "SQRT(POW(69.1 * (latitude - "
                + str(lat)
                + "), 2) + POW(69.1 * ("
                + str(lng)
                + " - longitude) * COS(latitude / 57.3), 2))"
            ).label("distance"),
        )
        .order_by("distance")
        .subquery()
    )
    nearby_colleges = (
        db.session.query(temp)
        .filter(text("distance<" + str(DEFAULT_NEARBY_RADIUS)))
        .all()
    )
    if num > 0:
        nearby_colleges = nearby_colleges[:num]
    return college_schema.dump(nearby_colleges, many=True)


def get_nearby_housing(lat, lng, num):
    temp = (
        db.session.query(
            HousingUnit.address,
            HousingUnit.property_type,
            HousingUnit.id,
            HousingUnit.latitude,
            HousingUnit.longitude,
            literal_column(
                "SQRT(POW(69 * (latitude - "
                + str(lat)
                + "), 2) + POW(69 * ("
                + str(lng)
                + " - longitude) * COS(latitude / 57), 2))"
            ).label("distance"),
        )
        .order_by("distance")
        .subquery()
    )
    nearby_housing = (
        db.session.query(temp)
        .filter(text("distance<" + str(DEFAULT_NEARBY_RADIUS)))
        .all()
    )
    if num > 0:
        nearby_housing = nearby_housing[:num]
    result = housing_unit_schema.dump(nearby_housing, many=True)
    counter = 0
    for element in nearby_housing:
        temp = HousingUnitImage.query.filter_by(housing_id=element.id).first()
        house_img = housing_unit_img_schema.dump(temp)
        result[counter]["img_url"] = (
            house_img["img_url"] if "img_url" in house_img else None
        )
        counter += 1
    return result


def get_nearby_jobs(lat, lng, num):
    temp = (
        db.session.query(
            Job.title,
            Job.company,
            Job.id,
            Job.latitude,
            Job.longitude,
            Job.img_url,
            literal_column(
                "SQRT(POW(69.1 * (latitude - "
                + str(lat)
                + "), 2) + POW(69.1 * ("
                + str(lng)
                + " - longitude) * COS(latitude / 57.3), 2))"
            ).label("distance"),
        )
        .order_by("distance")
        .subquery()
    )
    nearby_jobs = (
        db.session.query(temp)
        .filter(text("distance<" + str(DEFAULT_NEARBY_RADIUS)))
        .all()
    )
    if num > 0:
        nearby_jobs = nearby_jobs[:num]
    return job_schema.dump(nearby_jobs, many=True)


# Helper methods for searching specific models
# inspired by GeoJobs https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/back-end/app.py

def search_colleges(parameters):
    results = {}
    for parameter in parameters:
        queries = []
        try:
            queries.append(College.city.contains(parameter))
            queries.append(College.name.contains(parameter))
        except:
            pass
        try:
            queries.append(College.latitude.contains("cast(" + float(parameter) + " as float)"))
            queries.append(College.longitude.contains("cast(" + float(parameter) + " as float)"))
            queries.append(College.admission_rate.contains("cast(" + float(parameter) + " as float)"))
        except:
            pass
        try:
            queries.append(College.instate_tuition.contains("cast(" + int(parameter) + " as int)"))
            queries.append(College.outstate_tuition.contains("cast(" + int(parameter) + " as int)"))
        except:
            pass
        colleges = College.query.filter(or_(*queries))
        for college in colleges:
            if not college in results:
                results[college] = 1
            else:
                results[college] += 1
    return results

def search_housing(parameters):
    results = {}
    for parameter in parameters:
        queries = []
        try:
            queries.append(HousingUnit.city.contains(parameter))
            queries.append(HousingUnit.address.contains(parameter))
            queries.append(HousingUnit.property_type.contains(parameter))
            queries.append(HousingUnit.date_listed.contains(parameter))
        except:
            pass
        try:
            queries.append(HousingUnit.latitude.contains("cast(" + float(parameter) + " as float)"))
            queries.append(HousingUnit.longitude.contains("cast(" + float(parameter) + " as float)"))
        except:
            pass
        try:
            queries.append(HousingUnit.bathrooms.contains("cast(" + int(parameter) + " as int)"))
            queries.append(HousingUnit.bedrooms.contains("cast(" + int(parameter) + " as int)"))
            queries.append(HousingUnit.price.contains("cast(" + int(parameter) + " as int)"))
            queries.append(HousingUnit.sqft.contains("cast(" + int(parameter) + " as int)"))
        except:
            pass
        units = HousingUnit.query.filter(or_(*queries))
        for unit in units:
            if not unit in results:
                results[unit] = 1
            else:
                results[unit] += 1
    return results

def search_jobs(parameters):
    results = {}
    for parameter in parameters:
        queries = []
        try:
            queries.append(Job.title.contains(parameter))
            queries.append(Job.company.contains(parameter))
            queries.append(Job.city.contains(parameter))
            queries.append(Job.category.contains(parameter))
            queries.append(Job.url.contains(parameter))
            queries.append(Job.description.contains(parameter))
        except:
            pass
        try:
            queries.append(Job.created.contains(datetime(parameter)))
        except:
            pass
        try:
            queries.append(Job.salary_min.contains("cast(" + int(parameter) + " as int)"))
            queries.append(Job.salary_max.contains("cast(" + int(parameter) + " as int)"))
        except:
            pass
        try:
            queries.append(Job.latitude.contains("cast(" + float(parameter) + " as float)"))
            queries.append(Job.longitude.contains("cast(" + float(parameter) + " as float)"))
        except:
            pass
        jobs = Job.query.filter(or_(*queries))
        for job in jobs:
            if not job in results:
                results[job] = 1
            else:
                results[job] += 1
    return results


# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
