import json
from models import app, db, College, CollegeImage, HousingUnit, HousingUnitImage, Job

def populate_db():
    populate_colleges()
    populate_housing()
    populate_housing_imgs()
    populate_jobs()

# TODO: figure out how to populate db for our models and data
def populate_colleges():
    pass

def populate_housing():
    pass

def populate_housing_imgs():
    pass

def populate_jobs():
    pass

if __name__ == "__main__":
    with app.app_context():
        # TODO: figure out if we need to drop/create all here as well
        # db.drop_all()
        # db.create_all()
        # populate_db()
        pass