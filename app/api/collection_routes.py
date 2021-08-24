from flask import Blueprint, request, jsonify
from app.models import db, Beer, Collection
from app.forms.collection_form import CollectionForm
from flask_login import current_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages

collection_routes = Blueprint('collections', __name__)


@collection_routes.route('/')
@login_required
def get_all_collections():
    return current_user.to_dict()['collections']


@collection_routes.route('/<int:id>', methods=['GET'])
@login_required
def oneCollection(id):
    oneCollection = Collection.query.get(id)

    return oneCollection.to_dict()


@collection_routes.route('/create', methods=['POST'])
@login_required
def create_collection():
    data = request.get_json()

    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        collection = Collection(
            name=data['name'],
            userId=current_user.id,
        )
        db.session.add(collection)
        db.session.commit()
        return collection.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@collection_routes.route('/edit', methods=['PUT'])
@login_required
def edit_collection():
    data = request.get_json()
    collection = Collection.query.get(data['id'])
    # check if user owns the collection
    if collection.userId == current_user.id:
        collection.name = data['name']
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
