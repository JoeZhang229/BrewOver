import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editBeer } from '../../store/beer';

export default function EditBeer({ beer }) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const [beerName, setBeerName] = useState(beer.name);
	const [description, setDescription] = useState(beer.description);
	const [abv, setabv] = useState(beer.abv);
	const [imageUrl, setImageUrl] = useState(beer.imageUrl || '');
	const [malt, setMalt] = useState(beer.malt);
	const [hops, setHops] = useState(beer.hops);
	const [yeast, setYeast] = useState(beer.yeast);

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			editBeer({
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
