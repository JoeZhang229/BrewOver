from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class CollectionForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    userId = IntegerField('User Id', validators=[DataRequired()])
    save = SubmitField('Save')
