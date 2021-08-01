import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer } from '../../store/beer';

export default function CreateBeer() {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const [beerName, setBeerName] = useState('');
	const [description, setDescription] = useState('');
	const [abv, setabv] = useState('');

	useEffect(() => {}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const beerObj = {
			name: beerName,
			abv: abv,
			description: description,
		};
		dispatch(createOneBeer(beerObj));
	};

	return (
		<div>
			{' '}
			Hi
			<form onSubmit={onSubmit}>
				<input
					onChange={({ target: { value } }) => setBeerName(value)}
					value={beerName}
				>
					Name
				</input>
				<input
					onChange={({ target: { value } }) => setDescription(value)}
					value={description}
				>
					Description
				</input>
				<input
					onChange={({ target: { value } }) => setabv(value)}
					value={abv}
				>
					ABV
				</input>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}
