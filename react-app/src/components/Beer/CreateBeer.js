import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer } from '../../store/beer';

export default function CreateBeer() {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const [beerName, setBeerName] = useState('');
	const [description, setDescription] = useState('');
	const [abv, setabv] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [malt, setMalt] = useState('');
	const [hops, setHops] = useState('');
	const [yeast, setYeast] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		console.log(
			'form info',
			JSON.stringify({
				name: beerName,
				description: description,
				abv: abv,
			})
		);

		dispatch(
			createOneBeer({
				name: beerName,
				abv: abv,
				description: description,
				image_url: imageUrl,
				malt: malt,
				hops: hops,
				yeast: yeast,
				type: 'beers',
			})
		);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label>Name: </label>
				<input
					onChange={({ target: { value } }) => setBeerName(value)}
					value={beerName}
					required
				></input>
				<label>Description: </label>
				<input
					onChange={({ target: { value } }) => setDescription(value)}
					value={description}
					required
				></input>
				<label>ABV: </label>
				<input
					onChange={({ target: { value } }) => setabv(value)}
					value={abv}
					required
				></input>
				<label>image_url: </label>
				<input
					onChange={({ target: { value } }) => setImageUrl(value)}
					value={imageUrl}
				></input>
				<label>Malt: </label>
				<input
					onChange={({ target: { value } }) => setMalt(value)}
					value={malt}
				></input>
				<label>Hops: </label>
				<input
					onChange={({ target: { value } }) => setHops(value)}
					value={hops}
				></input>
				<label>Yeast: </label>
				<input
					onChange={({ target: { value } }) => setYeast(value)}
					value={yeast}
				></input>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}
