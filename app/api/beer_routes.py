from flask import Blueprint, request
from app.models import db, Beer, Collection, beer_collection
from ..forms import BeerForm
from flask_login import current_user, login_required

beer_routes = Blueprint('beers', __name__)

# @beer_routes.route('/', methods=['GET'])
# @login_required
# def all_beers():


def saveBeer(reqObj, beerObj):
    newBeer = beerObj
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
    form = BeerForm()
    beerObj = Beer()
    # newBeer = saveBeer(data, beerObj)
    form.populate_obj(beerObj)

    print(beerObj.beer_dict())
    # need to find out which collection, based on id, to save (Beer collection table)
    # collection = Collection(
    #     userId=current_user.id,
    #     beers=newBeer
    # )
    currentCollection = Collection.query.get(data['collectionId'])
    if (currentCollection.userId == current_user.id):
        currentCollection.beers.append(beerObj)
        # beer_collection.collections_id = data['collectionId']
        db.session.add(currentCollection)
        db.session.commit()
        # beer_collection.beers_id = newBeer.id

    print('backend beer~~~~~~', beerObj)
    db.session.add(beerObj)
    # db.session.add_all([newBeer, currentCollection])
    db.session.commit()
    return beerObj.beer_dict()


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
    # userId = current_user.id
    # userCollections = current_user.to_dict()['collections']
    beer = Beer.query.get(id)
    # if (userId == ) grab user Id from collection
    db.session.delete(beer)
    db.session.commit()
    return {'message': 'deleted beer'}


@beer_routes.route('/edit', methods=['PUT'])
@login_required
def edit_beer():
    data = request.get_json()
    form = BeerForm()
    beerObj = Beer.query.get(data['id'])
    form.populate_obj(beerObj)

    db.session.commit()
    return beerObj.beer_dict()
