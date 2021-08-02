from .db import db


class Drink(db.Model):
    __tablename__ = 'drinks'  # is this necessary

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    image_url = db.Column(db.String(50))
    abv = db.Column(db.String(50))
    description = db.Column(db.Text)
    type = db.Column(db.String(50))  # db,Enum('beer', 'cocktail', name=type)

    __mapper_args__ = {
        'polymorphic_identity': 'drinks',
        'polymorphic_on': type
    }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'abv': self.abv,
            'image_url': self.image_url,
            'description': self.description,
            'type': self.type,
        }
