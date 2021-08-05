from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, TextAreaField
from wtforms.validators import DataRequired


class BeerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    abv = IntegerField('ABV', validators=[DataRequired()])
    type = SelectField(
        'Type', choices=[('Beers', 'Beers'), ('Cocktails', 'Cocktails')])
    image_url = StringField('FirstBrewed')
    malt = StringField('Malt')
    hops = StringField('Hops')
    yeast = StringField('yeast')
    create = SubmitField('Create')
