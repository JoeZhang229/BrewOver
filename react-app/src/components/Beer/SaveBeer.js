import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer, unloadAllBeers, loadBeers } from '../../store/beer';
import {
	getOneCollection,
	createBeerToCollection,
} from '../../store/collection';
import './css/SaveBeer.css';

export default function SaveBeer() {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)
	const beer = useSelector((state) => state.beers.currentBeer);
	const [success, setSuccess] = useState(false);
	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);
	const [collectionVal, setCollectionVal] = useState(collection[0]?.id);

	useEffect(() => {}, []);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (collection.length === 0) {
			return;
			// separate dispatch based on selected Collection
		} else if (+collectionVal === currentCollection.id) {
			dispatch(
				createOneBeer({
					name: beer.name,
					abv: beer.abv,
					description: beer.description,
					image_url: beer.image_url,
					collectionId: +collectionVal,
					malt: beer.malt,
					hops: beer.hops,
					yeast: beer.yeast,
					type: 'beers',
				})
			);
		} else {
			await dispatch(getOneCollection(+collectionVal));
			dispatch(
				createBeerToCollection({
					name: beer.name,
					abv: beer.abv,
					description: beer.description,
					image_url: beer.image_url,
					collectionId: +collectionVal,
					malt: beer.malt,
					hops: beer.hops,
					yeast: beer.yeast,
					type: 'beers',
				})
			);
		}

		setSuccess(true);
	};

	return (
		<form onSubmit={onSubmit}>
			{collection.length ? (
				<div className='save-beer-form'>
					<div className='save-beer-select'>
						<label>Your Collections</label>
						<select
							onChange={(e) => setCollectionVal(e.target.value)}
						>
							{collection &&
								collection.map((collect) => (
									<option key={collect.id} value={collect.id}>
										{collect.name}
									</option>
								))}
						</select>
					</div>
					{success && <div>Successfully Saved!</div>}
					<button type='submit'>Save</button>
				</div>
			) : (
				<div className='no-collections-error'>
					Please create a collection before saving a beer
				</div>
			)}
		</form>
	);
}
