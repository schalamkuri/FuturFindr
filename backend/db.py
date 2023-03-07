import json
import sys
from models import app, db, College, HousingUnit, HousingUnitImage, Job
import googlemaps
import wikipedia
from googleapiclient.discovery import build

gmaps = googlemaps.Client(key='AIzaSyB--bIa6UPVD5X1MRBveqR6A7Hy4-tMfSo')
gsearch_key = "AIzaSyBQ3-z04RoOVwb93OevrNok30ZRTXoc4mE"
gsearch_id = "90e585031d91d445c"
adzuna_img_link = "https://zunastatic-abf.kxcdn.com/images/global/jobs/fb_share.png"

# google custom search helper method
# modeled after sample code from google themselves
# https://github.com/googleapis/google-api-python-client/blob/main/samples/customsearch/main.py

# First, build a service object for interacting with the API.
service = build(
    "customsearch", "v1", developerKey=gsearch_key
)

def google_search(term):
    result = (
        service.cse()
        .list(
            q=term,
            cx=gsearch_id,
            searchType="image"
        )
        .execute()
    )
    # If we have a valid result, return it
    try:
        return result["items"][0]["link"]
    except:
        return None

def populate_db():
    populate_colleges()
    print("Finished filling college data.")
    populate_housing()
    print("Finished filling housing data.")
    populate_housing_imgs()
    print("Finished filling housing image data.")
    populate_jobs()
    print("Finished filling job data.")

def populate_colleges():
    temp = open("api_data/college_data.json")
    college_data = json.load(temp)
    temp.close()

    # File is an array of arrays
    for college in college_data["results"] :
            # find lat/long coordinates for address
            if "school.name" in college:
                geocode_result = gmaps.geocode(college["school.name"])
                # find image from google custom search too
                image = google_search(college["school.name"])
            db_row = {
                "id": college["id"] if "id" in college else None,
                "city": college["school.city"] if "school.city" in college else None,
                "name": college["school.name"] if "school.name" in college else None,
                "latitude": geocode_result[0]['geometry']['location']['lat'] if geocode_result else None,
                "longitude": geocode_result[0]['geometry']['location']['lng'] if geocode_result else None,
                "admission_rate": college["2020.admissions.admission_rate.overall"] if "2020.admissions.admission_rate.overall" in college else None,
                "outstate_tuition": college["2020.cost.tuition.out_of_state"] if "2020.cost.tuition.out_of_state" in college else None,
                "instate_tuition": college["2020.cost.tuition.in_state"] if "2020.cost.tuition.in_state" in college else None,
                "url": college["school.school_url"] if "school.school_url" in college else None,
                "img_url": image if image else None
            }

            db.session.add(College(**db_row))
    db.session.commit()

def populate_housing():
    temp = open("api_data/housing_data.json")
    housing_data = json.load(temp)
    temp.close()

    # File is an array of arrays
    for array1 in housing_data:
        for array2 in array1:
            # find lat/long coordinates for address
            if "formattedAddress" in array2:
                geocode_result = gmaps.geocode(array2["formattedAddress"])
            db_row = {
                "id": array2["id"] if "id" in array2 else None,
                "city": array2["city"] if "city" in array2 else None,
                "latitude": geocode_result[0]['geometry']['location']['lat'] if geocode_result else None,
                "longitude": geocode_result[0]['geometry']['location']['lng'] if geocode_result else None,
                "bathrooms": array2["bathrooms"] if "bathrooms" in array2 else None,
                "bedrooms": array2["bedrooms"] if "bedrooms" in array2 else None,
                "price": array2["price"] if "price" in array2 else None,
                "address": array2["formattedAddress"] if "formattedAddress" in array2 else None,
                "property_type": array2["propertyType"] if "propertyType" in array2 else None,
                "sqft": array2["squareFootage"] if "squareFootage" in array2 else None,
                "date_listed": array2["listedDate"] if "listedDate" in array2 else None,
            }

            db.session.add(HousingUnit(**db_row))
    db.session.commit()


def populate_housing_imgs():
    with open("api_data/housing_images.json") as housing_images:
        temp_num = 1
        imgs = json.load(housing_images)
        for house in imgs:
            # find associated housing unit
            if "id" in house:
                temp = HousingUnit.query.filter_by(id=house["id"]).first()
                if temp:
                    for image in house["images"]:
                        db_row = {
                            "id": temp_num,
                            "housing_id": house["id"],
                            "img_url": image,
                        }
                        temp_num += 1
                        image_instance = HousingUnitImage(**db_row)
                        temp.images.append(image_instance)
                        db.session.add(image_instance)
        db.session.commit()

def populate_jobs():
    temp = open("api_data/full_time_jobs.json", encoding="utf8")
    fulltime_job_data = json.load(temp)
    temp.close()

    # File is an array of arrays
    for job in fulltime_job_data['results']:
        if "company" in job:
            # find image from google custom search too
            image = google_search(job["company"])
        db_row = {
            "id": job["id"],
            "title": job["title"],
            "city": job["location"]["area"][3] if len(job["location"]["area"]) >= 4 else job["location"]["display_name"],
            "company": job["company"]["display_name"],
            "category": job["category"]["label"],
            "type": "Full-time",
            "url": job["redirect_url"],
            "salary_min": job["salary_min"],
            "salary_max": job["salary_max"] if "salary_max" in job else None,
            "latitude": job["latitude"] if "latitude" in job else None,
            "longitude": job["longitude"] if "longitude" in job else None,
            "description": job["description"],
            "created": job["created"],
            "img_url" : image if image else None
        }
        db.session.add(Job(**db_row))

    temp = open("api_data/part_time_jobs.json", encoding="utf8")
    parttime_job_data = json.load(temp)
    temp.close()

    for job in parttime_job_data['results']:
        if "company" in job:
            # find image from google custom search too
            image = google_search(job["company"])
        db_row = {
            "id": job["id"],
            "title": job["title"],
            "city": job["location"]["area"][3] if len(job["location"]) >= 4 else job["location"]["display_name"],
            "company": job["company"]["display_name"],
            "category": job["category"]["label"],
            "type": "Part-time",
            "url": job["redirect_url"],
            "salary_min": job["salary_min"],
            "salary_max": job["salary_max"] if "salary_max" in job else None,
            "latitude": job["latitude"] if "latitude" in job else None,
            "longitude": job["longitude"] if "longitude" in job else None,
            "description": job["description"],
            "created": job["created"],
            "img_url" : image if image else None
        }
        db.session.add(Job(**db_row))

    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Reset database to empty - starting to fill database...")
        populate_db()