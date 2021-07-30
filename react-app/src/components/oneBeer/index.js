import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getOneBeer } from '../../store/beer';

export default function OneBeer() {
	const dispatch = useDispatch();
	const beer = useSelector((state) => Object.values(state.beer))[0];
	console.log('state beer', beer);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getOneBeer(+id));
	}, [dispatch, id]);

	return (
		<div>
			<div>Name: {beer.name}</div>
			<div>Description {beer.description}</div>
		</div>
	);
}
