import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import BeerCard from './BeerCard';
import { getOneBeer } from '../../store/beer';

export default function OneBeer() {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)
	const beer = useSelector((state) => state.beers.currentBeer) || null;
	const postsLoaded = useSelector((state) => state.beers.loaded);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getOneBeer(+id));
	}, [dispatch, id, postsLoaded]);

	return (
		beer && (
			<div className='container'>{beer && <BeerCard beer={beer} />}</div>
		)
	);
}
