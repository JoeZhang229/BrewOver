// import csrfetch from './csrfetch';
const GET_ONE_BEER = 'beers/GET_ONE_BEER';
const GET_ALL_BEERS = 'beers/GET_ALL_BEERS';
const UNLOAD_BEERS = 'beers/UNLOAD';
const UNLOAD_ONE_BEER = 'beers/UNLOAD_ONE';
const CREATE_BEER = 'beers/CREATE';
const EDIT_BEER = 'beers/EDIT';
const DELETE_BEER = 'beers/DELETE';

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

export const changeBeer = (beer) => {
	return {
		type: EDIT_BEER,
		beer: beer,
	};
};

export const delBeer = (beerId) => {
	return {
		type: DELETE_BEER,
		beerId,
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

// POST
export const createOneBeer = (beerData) => async (dispatch) => {
	const res = await fetch('/api/beers/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(beerData),
	});
	if (res.ok) {
		const beer = await res.json();
		dispatch(createBeer(beer));
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
	dispatch(getBeer(randomBeer[0]));
	return randomBeer;
};

// PUT
export const editBeer = (beerData) => async (dispatch) => {
	const res = await fetch('/api/beers/edit', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(beerData),
	});
	if (res.ok) {
		const editedBeer = await res.json();
		dispatch(changeBeer(editedBeer));
	}
};

// DELETE
export const deleteBeer = (id) => async (dispatch) => {
	const res = await fetch(`/api/beers/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
	});
	if (res.ok) {
		await res.json();
		dispatch(delBeer(id));
		return res;
	}
};

const initialState = {
	beers: {},
	currentBeer: '',
	loaded: false,
};
export default function beerReducer(state = initialState, action) {
	let newState = {};
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
				beers: { ...state.beers, ...action.beer },
				// currentBeer: { ...action.beer },
				currentBeer: { ...state.currentBeer },
				loaded: true,
			};
		case GET_ONE_BEER:
			return {
				beers: { ...state.beers },
				currentBeer: { ...action.beer },
				loaded: true,
			};
		case EDIT_BEER:
			return {
				beers: { ...state.beers, ...action.beer },
				currentBeer: { ...action.beer },
				loaded: true,
			};
		case DELETE_BEER:
			newState = { ...state };
			delete newState.beers[action.beerId];
			return {
				...newState,
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
