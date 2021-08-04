import React from 'react';

import SaveBeer from './SaveBeer';
import { useSelector, useDispatch } from 'react-redux';
import './css/beercard.css';
import errorImg from '../imgs/beer-error-icon.png';

export default function BeerCard({ beer }) {
	// const beer = useSelector((state) => state.beers.currentBeer) || null;
	const loaded = useSelector((state) => state.collections.loaded);
	const { malt, yeast, hops } = beer;
	console.log('frontend malt', malt);
	return (
		<div className='beer-card-container'>
			{beer && (
				// <div>
				<div className='beer-card'>
					<div className='beer-card-image'>
						<img
							src={beer.image_url ? beer.image_url : errorImg}
							alt={beer.description}
						></img>
					</div>
					<div className='beer-card-name'>
						<h3>Name: {beer.name}</h3>
					</div>
					<div className='beer-card-info'>
						<p>Description {beer.description}</p>
						<p>ABV: {beer.abv}%</p>
						<div>
							Malt:
							{/* {loaded &&
								malt?.map((malt, idx) => (
									<p key={idx}>{malt.name}</p>
								))} */}
						</div>
					</div>
					<div className='beer-card-btn'>
						<SaveBeer />
					</div>
				</div>
				// </div>
			)}
		</div>
	);
}
