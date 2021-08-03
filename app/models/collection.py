from .db import db


class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    beers = db.relationship('Beer', backref='collections',
                            secondary='beer_collection')

    # beer.collection or collection.beer

    def to_dict(self):
        return {
            'userId': self.userId,
            'beers': [beer.beer_dict() for beer in self.beers],
        }