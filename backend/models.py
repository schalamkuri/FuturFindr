from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug=True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://idb_master:CS373idb!@futurfindr-db.cbbs3s1efq9u.us-east-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)

class College(db.Model) :
    id = db.Column(db.BigInteger, primary_key = True)
    city = db.Column(db.String(40))
    name = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    admission_rate = db.Column(db.Float)
    instate_tuition = db.Column(db.Integer)
    outstate_tuition = db.Column(db.Integer)
    url = db.Column(db.String(150))
    img_url = db.Column(db.String(1000))

class HousingUnit(db.Model) :
    id = db.Column(db.String(65), primary_key = True)
    city = db.Column(db.String(40))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    bathrooms = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    price = db.Column(db.Integer)
    address = db.Column(db.String(70))
    property_type = db.Column(db.String(20))
    sqft = db.Column(db.Integer)
    date_listed = db.Column(db.String(40))
    images = db.relationship('HousingUnitImage', backref = 'housingunit')

class HousingUnitImage(db.Model) :
    id = db.Column(db.BigInteger, primary_key = True)
    housing_id = db.Column(db.String(65), db.ForeignKey(HousingUnit.id))
    img_url = db.Column(db.String(1000))

class Job(db.Model) : 
    id = db.Column(db.BigInteger, primary_key = True)
    title = db.Column(db.String(150))
    company = db.Column(db.String(60))
    city = db.Column(db.String(50))
    category = db.Column(db.String(40))
    type = db.Column(db.String(10))
    url = db.Column(db.String(150))
    salary_min = db.Column(db.Integer)
    salary_max = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.String(550))
    created = db.Column(db.DateTime)
    img_url = db.Column(db.String(1000))
