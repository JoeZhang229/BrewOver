const GET_ONE_COLLECTION = 'collections/GET_ONE_COLLECTION';
const GET_ALL_COLLECTIONS = 'collections/GET_ALL_COLLECTIONS';

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

export const getAllCollections = () => async (dispatch) => {
	const res = await fetch(`/api/collections/`);
	if (res.ok) {
		const collections = await res.json();
		debugger;
		console.log('thunk collections', collections);
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

const initialState = {
	collections: {},
	currentCollection: '',
	loaded: false,
};

export default function collectionReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_COLLECTIONS:
			let collections = {};
			action.collection.forEach((collection) => {
				collections[collection.name] = collection;
			});
			return {
				...state,
				collections,
				currentCollection: action.collection[0],
				loaded: true,
			};
		case GET_ONE_COLLECTION:
			return {
				collections: { ...state.collections },
				currentCollection: { ...action.currentCollection },
				loaded: true,
			};
		default:
			return state;
	}
}
