from app.models import db, Beer


# Adds a demo user, you can add other users here if you want
def seed_beers():
    db.session.execute('TRUNCATE beers RESTART IDENTITY CASCADE;')

    def makeBeer(id, name, description, image_url, abv, malt, hops, yeast, type):
        newBeer = Beer()
        newBeer.id = id
        newBeer.name = name
        newBeer.description = description
        newBeer.image_url = image_url
        newBeer.abv = abv
        newBeer.malt = malt
        newBeer.hops = hops
        newBeer.yeast = yeast
        newBeer.type = type

        return newBeer

    beer1 = makeBeer(
        317,
        "Al Adjore!",
        "BrewDog vs La Pirata. One of a series of collaborations with European craft breweries, aimed at promoting engagement and market growth. Our collab with Spanish brewes La Pirata features a barley wine, inspired by Muscatel.",
        None,
        9,
        "Pale Ale, Caramalt, Light Crystal, Medium Crystal, Sweet Orange Peel",
        "Magnum, Mandarina Bavaria, Hallertauer Blanc, French Oak Chips Medium Toast",
        "Wyeast 1056 - American Ale™",
        'beers'
    )

    db.session.add(beer1)

    db.session.commit()


def undo_beers():
    db.session.execute('TRUNCATE beers RESTART IDENTITY CASCADE;')
    db.session.commit()
