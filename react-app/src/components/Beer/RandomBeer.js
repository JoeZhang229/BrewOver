import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getRandomBeer } from '../../store/beer';
import RandomBeerCard from './RandomBeerCard';

export default function RandomBeer({ num }) {
	const dispatch = useDispatch();
	const beer = useSelector((state) => state.beers.currentBeer);
	const loaded = useSelector((state) => state.beers.loaded);
	const [success, setSuccess] = useState(false);

	// causing re-render twice? removing causes no render at refresh
	useEffect(() => {
		dispatch(getRandomBeer());
		setSuccess(false);
	}, [dispatch, num, success]);

	return (
		<div className='container'>
			{/* conditionals to check loading random beer from different paths */}
			{loaded && beer && beer.ingredients && (
				<RandomBeerCard beer={beer} success={success} setSuccess={setSuccess}/>
			)}
		</div>
	);
}
