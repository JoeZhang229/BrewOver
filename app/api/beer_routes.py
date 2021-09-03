from flask import Blueprint, request
from app.models import db, Beer, Collection, beer_collection
from ..forms import BeerForm
from flask_login import current_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages

beer_routes = Blueprint('beers', __name__)


@beer_routes.route('/create', methods=['POST'])
@login_required
def create_beer():
    data = request.get_json()
    form = BeerForm()

    # convert number to string for validation
    form.abv.data = str((form.abv.data))

    currentCollection = Collection.query.get(data['collectionId'])
    form['csrf_token'].data = request.cookies['csrf_token']
    if (currentCollection.userId == current_user.id) and form.validate_on_submit():
        beerObj = Beer()
        # convert string to proper decimal for backend
        form.abv.data = float((form.abv.data).strip('"'))
        # add validated beer info to object
        form.populate_obj(beerObj)
        # check if beer object exists
        if (db.session.add(beerObj)):
            # add beer to correct collection
            currentCollection.beers.append(beerObj)
            db.session.add(currentCollection)
            db.session.commit()
        else:
            # save beer object
            currentCollection.beers.append(beerObj)
            db.session.add(currentCollection)
            db.session.add(beerObj)
            db.session.commit()
        return beerObj.beer_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


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

    [beer] = [beer for beer in beerCollection if beer.id == beerId]

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
    beerObj = Beer.query.get(data['id'])
    form = BeerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if beerObj.userId == current_user.id and form.validate_on_submit():
        # convert string to proper decimal for backend
        form.abv.data = float((form.abv.data).strip('"'))
        form.populate_obj(beerObj)

        db.session.commit()
        return beerObj.beer_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
