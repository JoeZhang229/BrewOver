from flask import Blueprint, request, jsonify
from app.models import db, Beer, Collection
from flask_login import current_user, login_required

collection_routes = Blueprint('collections', __name__)


@collection_routes.route('/')
# @login_required
def get_all_collections():

    # return jsonify(collection)
    user = current_user.to_dict()
    print('backend user', user['id'])
    userCollections = Collection.query.filter(
        (Collection.userId == user['id'])
    ).all()
    print('backend', userCollections)
    newList = [c.to_dict()
               for c in userCollections]
    print('backend list', newList)
    # need help with destructuring everything
    return 'hello'


@collection_routes.route('/<int:id>', methods=['GET'])
@login_required
def allBeer():
    oneCollection = Collection.query.get(id)
    allBeer = {beer.id: beer.beer_dict() for beer in oneCollection}
    print('backend beers', allBeer)
    return jsonify(allBeer)
