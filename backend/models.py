from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug=True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:GeojobsTeam!@db.geojobs.me/geojobs'
db = SQLAlchemy(app)

class College(db.Model) :
    id = db.Column(db.BigInteger, primary_key = True)
    city = db.Column(db.String(40))
    name = db.Column(db.String(70))
    zip = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    admission_rate = db.Column(db.Float)
    ranking = db.Column(db.Integer)
    tuition = db.Column(db.Integer)
    #images = db.relationship('CollegeImage', backref = 'college')

class CollegeImage(db.Model) :
    id = db.Column(db.BigInteger, primary_key = True)
    college_id = db.Column(db.BigInteger, db.ForeignKey('college.id'))
    img_url = db.Column(db.String(200))


class HousingUnit(db.Model) :
    id = db.Column(db.BigInteger, primary_key = True)
    city = db.Column(db.String(40))
    bathrooms = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    price = db.Column(db.Integer)
    address = db.Column(db.String(70))
    property_type = db.Column(db.String(20))
    sqft = db.Column(db.Integer)
    build_year = db.Column(db.Integer)
    #images = db.relationship('HousingUnitImage', backref = 'housingunit')

class HousingUnitImage(db.Model) :
    id = db.Column(db.BigInteger, primary_key = True)
    apt_id = db.Column(db.String(65), db.ForeignKey('housingunit.id'))
    img_url = db.Column(db.String(200))

class Job(db.Model) : 
    id = db.Column(db.BigInteger, primary_key = True)
    title = db.Column(db.String(70))
    company = db.Column(db.String(40))
    city = db.Column(db.String(40))
    category = db.Column(db.String(30))
    url = db.Column(db.String(150))
    salary_min = db.Column(db.Integer)
    salary_max = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.String(550))
    created = db.Column(db.DateTime)
    img_url = db.Column(db.String(200))
