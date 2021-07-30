from flask import Blueprint, request
import json
from app.models import db, Beer
from flask_login import current_user, login_required

beer_routes = Blueprint('beers', __name__)


@beer_routes.route('/<int:id>', methods=['GET'])
@login_required
def one_beer(id):
    oneBeer = Beer.query.get(id)

    # convert JSON object to dictionary
    # return json.loads(oneBeer.beerObj)
    return oneBeer.beerObj
