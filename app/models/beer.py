from .db import db
from .drink import Drink


class Beer(Drink):
    __tablename__ = 'beers'

    __mapper_args__ = {
        'polymorphic_identity': 'beers'
    }
    id = db.Column(db.Integer, db.ForeignKey('drinks.id'), primary_key=True)
    malt = db.Column(db.Text)
    hops = db.Column(db.String)
    yeast = db.Column(db.Text)
    first_brewed = db.Column(db.String)

    def beer_dict(self):
        return {
            **self.to_dict(),
            'malt': self.malt,
            'hops': self.hops,
            'yeast': self.yeast,
            'first_brewed': self.first_brewed,
        }
