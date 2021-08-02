import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer } from '../../store/beer';

export default function SaveBeer({ beer }) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	// const [beerName, setBeerName] = useState('');

	useEffect(() => {}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			createOneBeer({
				name: beer.name,
				abv: beer.abv,
				description: beer.description,
				image_url: beer.image_url,
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
			<button type='submit'>Save</button>
		</form>
	);
}
