const GET_ONE_COLLECTION = 'collections/GET_ONE_COLLECTION';
const GET_ALL_COLLECTIONS = 'collections/GET_ALL_COLLECTIONS';
const CREATE_COLLECTION = 'collections/CREATE_COLLECTION';
const EDIT_COLLECTION = 'collections/EDIT_COLLECTION';
const DELETE_COLLECTION = 'collections/DELETE_COLLECTION';
// const CURRENT_COLLECTION = 'collections/CURRENT_COLLECTION';
const EDIT_BEER = 'beers/EDIT';

export const changeBeer = (beer) => {
	return {
		type: EDIT_BEER,
		beer: beer,
	};
};

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

// export const currentCollection = (collection) => {
// 	return {
// 		type: CREATE_COLLECTION,
// 		collection,
// 	};
// };

export const getAllCollections = () => async (dispatch) => {
	const res = await fetch(`/api/collections/`);
	if (res.ok) {
		const collections = await res.json();
		console.log('all collection object', collections);
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
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
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

// EDIT ONE BEER_REDUCER
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
		console.log('this is the editedBeer', editedBeer);
		dispatch(changeBeer(editedBeer));
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
		case EDIT_BEER:
			collections = { ...state };
			collections.currentCollection.beers.map((beer) => {
				console.log('currentCollection beer', beer.id, action.beer);
				if (beer.id === action.beer.id) {
					console.log('changed beer', beer);
					return (beer = action.beer);
				}
			});
			return {
				collections: { ...collections.collections },
				currentCollection: {
					...collections.currentCollection,
					beers: [...collections.currentCollection.beers],
				},
				loaded: true,
			};
			// ...collections,
			// ...collections.currentCollection.beers,
		default:
			return { ...state };
	}
}
