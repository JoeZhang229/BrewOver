# BrewOver

BrewOver is a web application for sharing and collecting beers with other users. It was inspired by Untappd and built using React.js, Flask, and [punkAPI](https://punkapi.com/).

## Welcome View

![home view](./welcome-view.png)

## Home View

![landing page](./landingPage.png)

### Technical Details

The application separates user created drinks and API generated content. I had challenges separating the API data and user created content, and destructuring the API into usable content for my application. I also had to make sure my backend recognized which was user content vs API content, and to handle the data differently.

### Features

-   Users can create accounts and save collections of beers
-   Account authentication
-   Users can create and modify Collections of their favorite beers
-   Application is not accessible without valid user account
-   Demo Login available

### Future Features

-   [ ] Users can copy users' collection(s) into their own list.
-   [ ] Drink Search by different criteria (name, ingredients, drink type, etc)
-   [ ] Reviews
-   [ ] Add Cocktail drinks
