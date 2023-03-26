# This app is inspired by GeoJobs's implementation. Their repo is here:
# https://gitlab.com/sarthaksirotiya/cs373-idb

from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import literal_column, or_, DOUBLE_PRECISION
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
    college_results = search_colleges(parameters)
    housing_results = search_housing(parameters)
    job_results = search_jobs(parameters)
    colleges = college_schema.dump(college_results, many=True)
    housing = housing_unit_schema.dump(housing_results, many=True)
    jobs = job_schema.dump(job_results, many=True)
    return jsonify(
        {"colleges": colleges, "housing": housing, "jobs": jobs}
    )


@app.route("/search/<string:model>/<string:query>")
def search_models(model, query):
    # get pagination arguments
    page_num = request.args.get("page", type=int)
    per_page = request.args.get("per_page", type=int)

    model = model.strip().lower()
    parameters = query.split()
    result = None
    if model == "college":
        results = search_colleges(parameters)
        # pagination
        total = results.count()
        if page_num is not None:
            results = paginate_helper(page_num, per_page, results)
            count = len(results)
        else:
            count = results.count()
        result = college_schema.dump(results, many=True)
    elif model == "housing":
        results = search_housing(parameters)
        # pagination
        total = results.count()
        if page_num is not None:
            results = paginate_helper(page_num, per_page, results)
            count = len(results)
        else:
            count = results.count()
        result = housing_unit_schema.dump(results, many=True)
    elif model == "job":
        results = search_jobs(parameters)
        # pagination
        total = results.count()
        if page_num is not None:
            results = paginate_helper(page_num, per_page, results)
            count = len(results)
        else:
            count = results.count()
        result = job_schema.dump(results, many=True)
    else:
        return Response(
            json.dumps({"error": "Invalid model type"}), mimetype="application/json"
        )
    return jsonify({"data": result, "meta": {"count": count, "total": total}})


# Functions for returning lists of models


@app.route("/colleges")
def get_colleges():
    # get api call arguments
    page_num = request.args.get("page", type=int)
    per_page = request.args.get("per_page", type=int)
    city = request.args.get("city")
    a_rate = request.args.get("a_rate")
    i_tuition = request.args.get("i_tution")
    o_tuition = request.args.get("o_tuition")
    sort = request.args.get("sort")
    asc = request.args.get("asc")
    query = db.session.query(College)
    
    # sort
    if sort is not None and getattr(College, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(College, sort))
        else:
            query = query.order_by(desc(getattr(College, sort)))

    # filter
    if city is not None:
        query = query.filter(College.city == city)
    if a_rate is not None:
        range = a_rate.split("-")
        try:
            query = query.filter(
                College.admission_rate >= range[0], College.admission_rate <= range[1]
            )
        except:
            pass
    if i_tuition is not None:
        range = i_tuition.split("-")
        try:
            query = query.filter(
                College.instate_tuition >= range[0], College.instate_tuition <= range[1]
            )
        except:
            pass
    if o_tuition is not None:
        range = o_tuition.split("-")
        try:
            query = query.filter(
                College.outstate_tuition >= range[0], College.outstate_tuition <= range[1]
            )
        except:
            pass
    
    # pagination
    count = query.count()
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
    city = request.args.get("city")
    p_type = request.args.get("p_type")
    bedrooms = request.args.get("bedrooms")
    bathrooms = request.args.get("bathrooms")
    price = request.args.get("price")
    sqft = request.args.get("sqft")
    sort = request.args.get("sort")
    asc = request.args.get("asc")
    query = db.session.query(HousingUnit)

    # filter
    if city is not None:
        query = query.filter(HousingUnit.city == city)
    if p_type is not None:
        query = query.filter(HousingUnit.property_type == p_type)
    if bedrooms is not None:
        range = bedrooms.split("-")
        try:
            query = query.filter(
                HousingUnit.bedrooms >= range[0], HousingUnit.bedrooms <= range[1]
            )
        except:
            pass
    if bathrooms is not None:
        range = bathrooms.split("-")
        try:
            query = query.filter(
                HousingUnit.bathrooms >= range[0],
                HousingUnit.bathrooms <= range[1],
            )
        except:
            pass
    if sqft is not None:
        range = sqft.split("-")
        try:
            query = query.filter(
                HousingUnit.sqft >= range[0], HousingUnit.sqft <= range[1]
            )
        except:
            pass
    if price is not None:
        range = price.split("-")
        try:
            query = query.filter(
                HousingUnit.price >= range[0], HousingUnit.price <= range[1]
            )
        except:
            pass

    # sort
    if sort is not None and getattr(HousingUnit, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(HousingUnit, sort))
        else:
            query = query.order_by(desc(getattr(HousingUnit, sort)))
    
    # pagination
    count = query.count()
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
    category = request.args.get("category")
    city = request.args.get("city")
    type = request.args.get("type")
    salary_range = request.args.get("salary_range")
    sort = request.args.get("sort")
    asc = request.args.get("asc")
    query = db.session.query(Job)
    
    # filter
    if category is not None:
        category.replace("and", "&")
        query = query.filter(Job.category == category)
    if city is not None:
        query = query.filter(Job.city == city)
    if type is not None:
        query = query.filter(Job.type == type)
    if salary_range is not None:
        range = range.split("-")
        try:
            query = query.filter(
                Job.salary_min >= range[0], Job.salary_max <= range[1]
            )
        except:
            pass

    # sort
    if sort is not None and getattr(Job, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Job, sort))
        else:
            query = query.order_by(desc(getattr(Job, sort)))

    # pagination
    count = query.count()
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
    for parameter in parameters:
        queries = []
        try:
            queries.append(College.city.icontains(parameter))
            queries.append(College.name.icontains(parameter))
        except:
            pass
        try:
            queries.append(College.latitude == float(parameter))
            queries.append(College.longitude == float(parameter))
            queries.append(College.admission_rate == float(parameter))
        except:
            pass
        try:
            queries.append(College.instate_tuition == int(parameter))
            queries.append(College.outstate_tuition == int(parameter))
        except:
            pass
        colleges = College.query.filter(or_(*queries))
    return colleges

def search_housing(parameters):
    for parameter in parameters:
        queries = []
        try:
            queries.append(HousingUnit.city.icontains(parameter))
            queries.append(HousingUnit.address.icontains(parameter))
            queries.append(HousingUnit.property_type.icontains(parameter))
            queries.append(HousingUnit.date_listed.icontains(parameter))
        except:
            pass
        try:
            queries.append(HousingUnit.latitude == float(parameter))
            queries.append(HousingUnit.longitude == float(parameter))
        except:
            pass
        try:
            queries.append(HousingUnit.bathrooms == int(parameter))
            queries.append(HousingUnit.bedrooms == int(parameter))
            queries.append(HousingUnit.price == int(parameter))
            queries.append(HousingUnit.sqft == int(parameter))
        except:
            pass
        units = HousingUnit.query.filter(or_(*queries))
    return units

def search_jobs(parameters):
    for parameter in parameters:
        queries = []
        try:
            queries.append(Job.title.icontains(parameter))
            queries.append(Job.company.icontains(parameter))
            queries.append(Job.city.icontains(parameter))
            queries.append(Job.category.icontains(parameter))
            queries.append(Job.url.icontains(parameter))
            queries.append(Job.description.icontains(parameter))
        except:
            pass
        try:
            queries.append(Job.created == datetime(parameter))
        except:
            pass
        try:
            queries.append(Job.salary_min == int(parameter))
            queries.append(Job.salary_max == int(parameter))
        except:
            pass
        try:
            queries.append(Job.latitude == float(parameter))
            queries.append(Job.longitude == float(parameter))
        except:
            pass
        jobs = Job.query.filter(or_(*queries))
    return jobs


# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
