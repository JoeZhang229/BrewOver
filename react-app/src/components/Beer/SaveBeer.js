import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer } from '../../store/beer';

export default function SaveBeer() {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)
	const beer = useSelector((state) => state.beers.currentBeer);
	const [success, setSuccess] = useState(false);
	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	const [collectionVal, setCollectionVal] = useState(collection[0].id);

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

		setSuccess(true);
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
			{success && <div>Successfully Saved!</div>}
		</form>
	);
}
