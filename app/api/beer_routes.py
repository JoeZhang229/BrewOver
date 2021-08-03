from flask import Blueprint, request
from app.models import db, Beer, Collection
from ..forms import BeerForm
from flask_login import current_user, login_required

beer_routes = Blueprint('beers', __name__)

# @beer_routes.route('/', methods=['GET'])
# @login_required
# def all_beers():


def saveBeer(reqObj):
    newBeer = Beer()
    newBeer.description = reqObj['description'],
    newBeer.name = reqObj['name'],
    newBeer.abv = reqObj['abv'],
    newBeer.image_url = reqObj['image_url']
    newBeer.malt = reqObj['malt']
    newBeer.hops = reqObj['hops']
    newBeer.yeast = reqObj['yeast']
    newBeer.type = reqObj['type']
    return newBeer


@beer_routes.route('/create', methods=['POST'])
@login_required
def create_beer():
    data = request.get_json()
    newBeer = saveBeer(data)

    # need to find out which collection, based on id, to save (Beer collection table)
    # collection = Collection(
    #     userId=current_user.id,
    #     beers=newBeer
    # )

    print('backend beer', newBeer)
    db.session.add(newBeer)
    db.session.commit()
    return newBeer.beer_dict()


@beer_routes.route('/<int:id>', methods=['GET'])
@login_required
def one_beer(id):
    oneBeer = Beer.query.get(id)

    # convert JSON object to dictionary
    # return json.loads(oneBeer.beerObj)
    return oneBeer.beer_dict()


@beer_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_beer(id):
    userId = current_user.to_dict()['id']
    beer = Beer.query.get(id)
    # if (user == ) grab user Id from collection
    db.session.delete(beer)
    db.session.commit()
    return {'message': 'deleted beer'}


@beer_routes.route('/edit', methods=['PUT'])
@login_required
def edit_beer(id):
    data = request.get_json()
    beer = Beer.query.get(id)
    beer.description = data['description'],
    beer.name = data['name'],
    beer.abv = data['abv'],
    beer.image_url = data['image_url']
    beer.malt = data['malt']
    beer.hops = data['hops']
    beer.yeast = data['yeast']
    beer.type = data['type']

    db.session.commit()
    return beer.beer_dict()