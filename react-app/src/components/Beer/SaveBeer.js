import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer } from '../../store/beer';
import Modal from 'react-modal';

export default function SaveBeer() {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)
	const beer = useSelector((state) => state.beers.currentBeer)[0];
	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	const [collectionVal, setCollectionVal] = useState(collection[0].id);
	// console.log('frontened', beer);
	// const [beerName, setBeerName] = useState('');

	useEffect(() => {}, []);

	const destructure = (arr) => {
		const result = new Set();
		arr.forEach((ele) => {
			result.add(ele.name);
		});
		return Array.from(result).join(', ');
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('select option', +collectionVal);
		const { malt, hops, yeast } = beer.ingredients;
		// const newMalt = destructure(malt);
		const newHops = destructure(hops);
		// const newYeast = destructure(yeast);
		console.log('hops', hops);
		console.log('destruct hops', newHops);
		console.log('yeast', yeast)
		dispatch(
			createOneBeer({
				id: beer.id,
				name: beer.name,
				abv: beer.abv,
				description: beer.description,
				image_url: beer.image_url,
				collectionId: +collectionVal,
				malt: destructure(malt),
				hops: destructure(hops),
				yeast: yeast,
				type: 'beers',
			})
		);
	};

	return (
		<form onSubmit={onSubmit}>
			{/* <input
				onChange={({ target: { value } }) => setBeerName(value)}
				value={beerName}
			></input> */}
			<div>
				{/* <Modal /> */}
				<label>Your Collections:</label>
				<select onChange={(e) => setCollectionVal(e.target.value)}>
					{collection &&
						collection.map((collect) => (
							<option key={collect.id} value={collect.id}>
								{collect.name}
							</option>
						))}
				</select>
			</div>
			<button type='submit'>Save</button>
		</form>
	);
}
