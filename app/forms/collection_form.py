from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class CollectionForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    save = SubmitField('Save')
