from flask import Blueprint, request
from app.models import db, Beer, Collection, beer_collection
from ..forms import BeerForm
from flask_login import current_user, login_required

beer_routes = Blueprint('beers', __name__)


@beer_routes.route('/create', methods=['POST'])
@login_required
def create_beer():
    data = request.get_json()
    form = BeerForm()
    beerObj = Beer()
    form.populate_obj(beerObj)

    currentCollection = Collection.query.get(data['collectionId'])
    if (currentCollection.userId == current_user.id):
        currentCollection.beers.append(beerObj)
        # beer_collection.collections_id = data['collectionId']
        db.session.add(currentCollection)
        db.session.commit()
        # beer_collection.beers_id = newBeer.id

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        db.session.add(beerObj)
        # db.session.add_all([newBeer, currentCollection])
        db.session.commit()
        return beerObj.beer_dict()
    return beerObj.beer_dict()


@beer_routes.route('/<int:id>', methods=['GET'])
@login_required
def one_beer(id):
    oneBeer = Beer.query.get(id)

    # convert JSON object to dictionary
    # return json.loads(oneBeer.beerObj)
    return oneBeer.beer_dict()


@beer_routes.route('/<int:beerId>', methods=['DELETE'])
@login_required
def delete_beer(beerId):

    data = request.get_json()
    collectionId = data['collectionId']
    currentCollection = (Collection.query.get(collectionId))
    beerCollection = currentCollection.beers

    [beer] = [beer for beer in beerCollection if beer.id is beerId]
    # delete if user created
    if beer.userId == current_user.id:
        dbBeer = Beer.query.get(beerId)
        db.session.delete(dbBeer)
        db.session.commit()
    # delete from user collection
    elif currentCollection.userId == current_user.id:
        currentCollection.beers.remove(beer)
        db.session.add(currentCollection)
        db.session.commit()
    return {'message': 'deleted beer'}


@beer_routes.route('/edit', methods=['PUT'])
@login_required
def edit_beer():
    data = request.get_json()
    form = BeerForm()
    beerObj = Beer.query.get(data['id'])
    if beerObj.userId == current_user.id:
        form.populate_obj(beerObj)
        db.session.commit()
    return beerObj.beer_dict()
