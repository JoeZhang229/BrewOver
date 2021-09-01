# BrewOver

BrewOver is a web application for sharing and collecting beers with other users. It was inspired by Untappd and built using the following:

-   React.js
-   Redux
-   Flask
-   SQLAlchemy
-   [Punk API](https://punkapi.com/).

## Welcome View

![home view](./welcome-view.png)

## Home View

![landing page](./landingPage.png)

### Features

-   Users can create accounts and save collections of beers
-   Account authentication
-   Users can create and modify Collections of their favorite beers
-   Application is not accessible without valid user account
-   Demo Login
-   Users can create beer entries or save beers from the API.

### Future Features

-   [ ] Users can copy users' collection(s) into their own list.
-   [ ] Drink Search by different criteria (name, ingredients, drink type, etc)
-   [ ] Reviews
-   [ ] Add Cocktail drinks

### Technical Details

## Punk API

Accesses Brewdog brewery's expansive beer catalogue, and returns detailed information such as fermenation temps, malt types, ph, ABV, etc.

## Challenges

The application separates user created drinks and API generated content. I had challenges separating the API data and user created content, and destructuring the API into usable content for my application. I also had to make sure my backend recognized which was user content vs API content, and to handle the data differently.

#### backend route for handling beer deletion based on user content or API content

```python
@beer_routes.route('/<int:beerId>', methods=['DELETE'])
@login_required
def delete_beer(beerId):

    data = request.get_json()
    collectionId = data['collectionId']
    currentCollection = (Collection.query.get(collectionId))
    beerCollection = currentCollection.beers

    [beer] = [beer for beer in beerCollection if beer.id is beerId]
    # delete if user created
    if beer.userId == current_user.id:
        dbBeer = Beer.query.get(beerId)
        db.session.delete(dbBeer)
        db.session.commit()
    # delete from user collection
    elif currentCollection.userId == current_user.id:
        currentCollection.beers.remove(beer)
        db.session.add(currentCollection)
        db.session.commit()
    return {'message': 'deleted beer'}
```
