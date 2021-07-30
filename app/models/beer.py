from .db import db


class Beer(db.Model):
    __tablename__ = 'beers'

    id = db.Column(db.Integer, primary_key=True)
    beerObj = db.Column(db.JSON)
