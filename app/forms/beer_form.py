from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, TextAreaField, DecimalField
from wtforms.validators import DataRequired, Length


class BeerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    abv = StringField('abv', validators=[DataRequired(
    ), Length(min=1, max=5, message='Too many decimal places')
    ])
    type = SelectField(
        'Type', choices=[('beers', 'beers'), ('Cocktails', 'Cocktails')])
    image_url = StringField('image_url')
    userId = IntegerField('userId')
    malt = StringField('Malt')
    hops = StringField('Hops')
    yeast = StringField('yeast')
    create = SubmitField('Create')
