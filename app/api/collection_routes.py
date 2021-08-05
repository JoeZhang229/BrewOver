from flask import Blueprint, request, jsonify
from app.models import db, Beer, Collection
from flask_login import current_user, login_required

collection_routes = Blueprint('collections', __name__)


@collection_routes.route('/')
@login_required
def get_all_collections():
    return current_user.to_dict()['collections']


@collection_routes.route('/<int:id>', methods=['GET'])
@login_required
def allBeer():
    oneCollection = Collection.query.get(id)
    allBeer = {collection.to_dict()['beers'] for collection in oneCollection}
    print('backend beers', allBeer)
    return jsonify(allBeer)


@collection_routes.route('/create', methods=['POST'])
@login_required
def create_collection():
    data = request.get_json()
    collection = Collection(
        name=data['name'],
        userId=current_user.id,
    )
    db.session.add(collection)
    db.session.commit()
    return collection.to_dict()


@collection_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_collection(id):
    collection = Collection.query.get(id)
    if collection.userId == current_user.id:
        db.session.delete(collection)
        db.session.commit()
    return {'message': 'deleted collection'}
