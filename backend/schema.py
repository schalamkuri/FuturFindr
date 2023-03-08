from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from models import Job, HousingUnit, College, HousingUnitImage

mm = Marshmallow()


class JobSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Job


class HousingUnitImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HousingUnitImage


class HousingUnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HousingUnit

    images = fields.RelatedList(fields.Nested(HousingUnitImageSchema))


class CollegeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = College


job_schema = JobSchema()
housing_unit_schema = HousingUnitSchema()
college_schema = CollegeSchema()
housing_unit_img_schema = HousingUnitImageSchema()
