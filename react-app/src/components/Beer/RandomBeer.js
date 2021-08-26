import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { getRandomBeer } from '../../store/beer';
import RandomBeerCard from './RandomBeerCard';

export default function RandomBeer({ num }) {
	const dispatch = useDispatch();
	const beer = useSelector((state) => state.beers.currentBeer);
	const loaded = useSelector((state) => state.beers.loaded);

	// causing re-render twice? removing causes no render at refresh
	useEffect(() => {
		dispatch(getRandomBeer());
		// return () => dispatch(unloadAllBeers());
		// dispatch(postsLoaded());
	}, [dispatch, num]);

	return (
		<div className='container'>
			{beer.ingredients && <RandomBeerCard beer={beer} />}
		</div>
	);
}
