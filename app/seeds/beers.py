from app.models import db, Beer


# Adds a demo user, you can add other users here if you want
def seed_beers():
    beer1 = Beer(
        beerObj={
            'id': '317',
            'name': "Al Adjore!",
            "description": "BrewDog vs La Pirata. One of a series of collaborations with European craft breweries, aimed at promoting engagement and market growth. Our collab with Spanish brewes La Pirata features a barley wine, inspired by Muscatel.", "image_url": None,
            "abv": 9,
            "ingredients": {
                "malt": [
                    {
                        "name": "Pale Ale",
                        "amount": {
                            "value": 7.08,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Caramalt",
                        "amount": {
                            "value": 0.48,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Light Crystal",
                        "amount": {
                            "value": 0.24,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Medium Crystal",
                        "amount": {
                            "value": 0.12,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Sweet Orange Peel",
                        "amount": {
                            "value": 20,
                            "unit": "grams"
                        }
                    }
                ], "hops": [
                    {
                        "name": "Magnum",
                        "amount": {
                            "value": 6,
                            "unit": "grams"
                        },
                        "add": "70",
                        "attribute": "Bittering"
                    },
                    {
                        "name": "Mandarina Bavaria",
                        "amount": {
                            "value": 20,
                            "unit": "grams"
                        },
                        "add": "10",
                        "attribute": "Flavour"
                    },
                    {
                        "name": "Hallertauer Blanc",
                        "amount": {
                            "value": 20,
                            "unit": "grams"
                        },
                        "add": "10",
                        "attribute": "Flavour"
                    },
                    {
                        "name": "French Oak Chips Medium Toast",
                        "amount": {
                            "value": 40,
                            "unit": "grams"
                        },
                        "add": "Wood Ageing",
                        "attribute": "Flavour"
                    }
                ],
                "yeast": "Wyeast 1056 - American Ale™"
            },
            "food_pairing": [
                "Stilton and walnut salad",
                "Toffee caramel cheesecake"
            ], })

    db.session.add(beer1)

    db.session.commit()


def undo_beers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
