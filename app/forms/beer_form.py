from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, TextAreaField
# import another validator
from wtforms.validators import DataRequired, InputRequired, NumberRange


class BeerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    abv = IntegerField('ABV', validators=[DataRequired(
    ), InputRequired(), NumberRange(min=1, max=100)])
    type = SelectField(
        'Type', choices=[('Beers', 'Beers'), ('Cocktails', 'Cocktails')])
    image_url = StringField('FirstBrewed')
    userId = IntegerField('userId')
    malt = StringField('Malt')
    hops = StringField('Hops')
    yeast = StringField('yeast')
    create = SubmitField('Create')
