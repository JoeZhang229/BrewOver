from flask import Blueprint, request
import requests
from app.models import db, Beer
from flask_login import current_user, login_required

beer_routes = Blueprint('beers', __name__)

# @beer_routes.route('/', methods=['GET'])
# @login_required
# def all_beers():


@beer_routes.route('/<int:id>', methods=['GET'])
@login_required
def one_beer(id):
    oneBeer = Beer.query.get(id)

    # convert JSON object to dictionary
    # return json.loads(oneBeer.beerObj)
    return oneBeer.beerObj


@beer_routes.route('/create', methods=['POST'])
@login_required
def create_beer():
    req = request.get_json()
    newBeer = Beer(
        beerObj=req['beerObj']
    )
    print('backend', req)
    db.session.add(newBeer)
    db.commit()
    return newBeer.beerObj
