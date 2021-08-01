import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { getRandomBeer, unloadAllBeers } from '../../store/beer';
import BeerCard from './BeerCard';

export default function RandomBeer() {
	const dispatch = useDispatch();
	// const beer = useSelector((state) => Object.values(state.currentBeer))[0];
	const beer = useSelector((state) => state.beers.currentBeer);
	const postsLoaded = useSelector((state) => state.beers.loaded);

	useEffect(() => {
		dispatch(getRandomBeer());
		// return () => dispatch(unloadAllBeers());
		dispatch(postsLoaded());
	}, [dispatch]);

	return (
		<div className='container'>
			<BeerCard beer={beer[0]} />
		</div>
	);
}
