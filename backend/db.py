import json
from models import app, db, College, CollegeImage, HousingUnit, HousingUnitImage, Job
import sys

def populate_db():
    #populate_colleges()
    populate_housing()
    populate_housing_imgs()
    populate_jobs()

# TODO: figure out how to populate db for our models and data
def populate_colleges():
    pass

def populate_housing():
    temp = open("api_data/housing_data.json")
    housing_data = json.load(temp)
    temp.close()

    # File is an array of arrays
    for array1 in housing_data:
        for array2 in array1:
            db_row = {
                "id": array2["id"] if "id" in array2 else None,
                "city": array2["city"] if "city" in array2 else None,
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
            #"img_url": logo_url[0] if logo_url else None,
        }
        db.session.add(Job(**db_row))

    temp = open("api_data/part_time_jobs.json", encoding="utf8")
    parttime_job_data = json.load(temp)
    temp.close()

    for job in parttime_job_data['results']:
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
            #"img_url": logo_url[0] if logo_url else None,
        }
        db.session.add(Job(**db_row))

    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        # TODO: figure out if we need to drop/create all here as well
        db.drop_all()
        db.create_all()
        populate_db()