// import csrfetch from './csrfetch';
const GET_ONE_BEER = 'beers/GET_ONE_BEER';
const GET_ALL_BEERS = 'beers/GET_ALL_BEERS';
const UNLOAD_BEERS = 'beers/UNLOAD';
const UNLOAD_ONE_BEER = 'beers/UNLOAD_ONE';
const CREATE_BEER = 'beers/CREATE';

export const getBeer = (beer) => {
	return {
		type: GET_ONE_BEER,
		beer: beer,
	};
};

export const loadBeers = (beer) => {
	return {
		type: GET_ALL_BEERS,
		beer: beer,
	};
};

export const createBeer = (beer) => {
	return {
		type: CREATE_BEER,
		beer: beer,
	};
};

export const unloadBeers = () => {
	return {
		type: UNLOAD_BEERS,
	};
};

export const UnloadOneBeer = () => ({
	type: UNLOAD_ONE_BEER,
});

export const unloadAllBeers = async (dispatch) => {
	dispatch(unloadBeers());
};

export const getAllBeers = () => async (dispatch) => {
	const { beers } = await fetch(`/api/beers`);
	dispatch(loadBeers(beers));
};

export const createOneBeer = (newBeer) => async (dispatch) => {
	const res = await fetch('/api/beers/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: newBeer,
	});
	// const res = await fetch('/api/beers/create', newBeer);
	if (res.ok) {
		console.log('create thunk', res.json());
		const newBeer = await res.json();
		dispatch(createBeer(newBeer));
		return newBeer;
	}
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

	const randomBeer = await res.json();
	console.log('thunk', randomBeer[0]);
	dispatch(getBeer(randomBeer));
	return randomBeer;
};

const initialState = {
	beers: {},
	currentBeer: null,
	loaded: false,
};
export default function beerReducer(state = initialState, action) {
	switch (action.type) {
		// deep copy to ensure useEffect checks the differences in state
		case GET_ALL_BEERS:
			return {
				...state,
				beers: {
					...action.beer,
				},
				loaded: true,
			};
		case CREATE_BEER:
			// return {
			// 	...state,
			// 	beers: {
			// 		...state.beers,
			// 		[action.beer.id]: action.beer,
			// 	},
			// };
			return {
				beer: { ...state.beer },
				currentBeer: { ...action.beer },
			};
		case GET_ONE_BEER:
			return {
				beer: { ...state.beer },
				currentBeer: { ...action.beer },
			};
		case UNLOAD_ONE_BEER:
			return {
				...state,
				currentBeer: null,
			};
		case UNLOAD_BEERS:
			return {
				...initialState,
				beers: {
					...initialState.beers,
				},
			};
		default:
			return state;
	}
}
