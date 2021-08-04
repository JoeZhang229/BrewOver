import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { getRandomBeer, unloadAllBeers } from '../../store/beer';
import BeerCard from './RandomBeerCard';

export default function RandomBeer() {
	const dispatch = useDispatch();
	const beer = useSelector((state) => state.beers.currentBeer);
	// const loaded = useSelector((state) => state.beers.loaded);

	useEffect(() => {
		dispatch(getRandomBeer());
		// return () => dispatch(unloadAllBeers());
		// dispatch(postsLoaded());
	}, [dispatch]);

	return (
		<div className='container'>{beer && <BeerCard beer={beer[0]} ingredients={beer[0].ingredients} />}</div>
	);
}
