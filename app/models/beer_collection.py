from .db import db


beer_collection = db.Table(
    'beer_collection',
    db.Column('collections_id', db.Integer, db.ForeignKey(
        'collections.id'), nullable=False),
    db.Column('beers_id', db.Integer, db.ForeignKey(
        'beers.id'), nullable=False)
)
