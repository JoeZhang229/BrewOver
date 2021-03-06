const GET_ONE_COLLECTION = 'collections/GET_ONE_COLLECTION';
const GET_ALL_COLLECTIONS = 'collections/GET_ALL_COLLECTIONS';
const CREATE_COLLECTION = 'collections/CREATE_COLLECTION';
const EDIT_COLLECTION = 'collections/EDIT_COLLECTION';
const DELETE_COLLECTION = 'collections/DELETE_COLLECTION';
// const CURRENT_COLLECTION = 'collections/CURRENT_COLLECTION';
const CREATE_BEER = 'collections/CREATE_BEER';
const UNLOAD_COLLECTION = 'collections/UNLOAD';

export const getCollection = (collection) => {
	return {
		type: GET_ONE_COLLECTION,
		collection: collection,
	};
};

export const loadCollections = (collection) => {
	return {
		type: GET_ALL_COLLECTIONS,
		collection: collection,
	};
};

export const createOneCollection = (collection) => {
	return {
		type: CREATE_COLLECTION,
		collection: collection,
	};
};

export const createBeer = (beer) => {
	return {
		type: CREATE_BEER,
		beer: beer,
	};
};

export const editOneCollection = (collection) => {
	return {
		type: EDIT_COLLECTION,
		collection: collection,
	};
};

export const deleteOneCollection = (collectionId) => {
	return {
		type: DELETE_COLLECTION,
		collectionId,
	};
};

export const unloadCollections = () => {
	return {
		type: UNLOAD_COLLECTION,
	};
};

export const getAllCollections = () => async (dispatch) => {
	const res = await fetch(`/api/collections/`);
	if (res.ok) {
		const collections = await res.json();
		dispatch(loadCollections(collections));
		return collections;
	}
};

export const getOneCollection = (id) => async (dispatch) => {
	const res = await fetch(`/api/collections/${id}`);

	if (res.ok) {
		const oneCollection = await res.json();
		dispatch(getCollection(oneCollection));
		return oneCollection;
	}
};

// POST
export const createCollection = (collectionData) => async (dispatch) => {
	const res = await fetch('/api/collections/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(collectionData),
	});

	if (res.ok) {
		const collection = await res.json();
		dispatch(createOneCollection(collection));
		return collection;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}
};

// POST BEER to collection

export const createBeerToCollection = (beerData) => async (dispatch) => {
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

// PUT
export const editCollection = (collectionData) => async (dispatch) => {
	const res = await fetch('/api/collections/edit', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(collectionData),
	});
	if (res.ok) {
		const editedCollection = await res.json();
		dispatch(editOneCollection(editedCollection));
	}
};

// DELETE
export const deleteCollection = (collectionId) => async (dispatch) => {
	const res = await fetch(`/api/collections/${collectionId}`, {
		method: 'DELETE',
		body: JSON.stringify({ collectionId }),
	});
	if (res.ok) {
		await res.json();
		dispatch(deleteOneCollection(collectionId));
		return res;
	}
};

const initialState = {
	collections: {},
	currentCollection: '',
	loaded: false,
};

export default function collectionReducer(state = initialState, action) {
	let collections = {};
	switch (action.type) {
		case GET_ALL_COLLECTIONS:
			action.collection.forEach((collection) => {
				collections[collection.id] = collection;
			});
			return {
				...state,
				collections,
				currentCollection: action.collection[0],
				loaded: true,
			};
		case CREATE_COLLECTION:
			collections = { ...state.collections };
			collections[action.collection.id] = action.collection;
			return {
				...state,
				collections,
				// currentCollection: action.collection[0],
				loaded: true,
			};
		// return {
		// 	collections: { ...state.collections, ...action.collection },
		// 	currentCollection: { ...state.currentCollection },
		// 	loaded: true,
		// };
		case GET_ONE_COLLECTION:
			return {
				collections: { ...state.collections },
				// currentCollection: { ...action.currentCollection },
				currentCollection: { ...action.collection },
				loaded: true,
			};
		case EDIT_COLLECTION:
			collections = { ...state };
			collections.collections[action.collection.id] = action.collection;
			return {
				...collections,
			};
		case DELETE_COLLECTION:
			collections = { ...state };
			delete collections.collections[action.collectionId];
			return {
				...collections,
			};
		case UNLOAD_COLLECTION:
			return {
				...initialState,
				// collections: { ...initialState.collections },
			};
		case CREATE_BEER:
			collections = { ...state };
			collections.currentCollection.beers.push(action.beer);
			return {
				...collections,
			};
		default:
			return state;
	}
}
