import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createOneBeer } from '../../store/beer';

export default function CreateBeer({beer}) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	// const [beerName, setBeerName] = useState('');

	useEffect(() => {}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createOneBeer(beer))
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
