const GET_BEER = 'beer/GET_BEER';

export const getBeer = (beer) => {
	return {
		type: GET_BEER,
		beer,
	};
};

export const getOneBeer = (id) => async (dispatch) => {
	const res = await fetch(`/api/beers/${id}`);

	if (res.ok) {
		const oneBeer = await res.json();
		dispatch(getBeer(oneBeer));
		return oneBeer;
	}
};

export const getRandomBeer = () => async (dispatch) => {
	const res = await fetch('https://api.punkapi.com/v2/beers/random');

    if (res.ok) {
        const randomBeer = await res.json();
        dispatch(getBeer(randomBeer));
        return randomBeer;
    }
};

const initialState = { beers: '' };
export default function beerReducer(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_BEER:
			[action.beer].forEach((beer) => {
				newState[beer.id] = beer;
			});
			return { ...state, ...newState };
		default:
			return state;
	}
}
