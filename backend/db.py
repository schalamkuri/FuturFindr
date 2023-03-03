import json
from models import app, db, College, CollegeImage, HousingUnit, HousingUnitImage, Job
import sys

def populate_db():
    #populate_colleges()
    populate_housing()
    #populate_housing_imgs()
    #populate_jobs()

# TODO: figure out how to populate db for our models and data
def populate_colleges():
    pass

def populate_housing():
    temp = open("api_data/housing_data.json")
    housing_data = json.load(temp)
    temp.close()

    temp_id_int = 1

    # File is an array of arrays
    for array1 in housing_data:
        for array2 in array1:
            db_row = {
                "id": temp_id_int,
                "city": array2["city"] if "city" in array2 else None,
                "bathrooms": array2["bathrooms"] if "bathrooms" in array2 else None,
                "bedrooms": array2["bedrooms"] if "bedrooms" in array2 else None,
                "price": array2["price"] if "price" in array2 else None,
                "address": array2["formattedAddress"] if "formattedAddress" in array2 else None,
                "property_type": array2["propertyType"] if "propertyType" in array2 else None,
                "sqft": array2["squareFootage"] if "squareFootage" in array2 else None,
                "date_listed": array2["listedDate"] if "listedDate" in array2 else None,
            }
            temp_id_int += 1
            db.session.add(HousingUnit(**db_row))
    db.session.commit()


def populate_housing_imgs():
    pass

def populate_jobs():
    pass

if __name__ == "__main__":
    with app.app_context():
        # TODO: figure out if we need to drop/create all here as well
        db.drop_all()
        db.create_all()
        populate_db()