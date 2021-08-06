import React from 'react';

import SaveBeer from './SaveBeer';
// import { useSelector } from 'react-redux';
import './css/beercard.css';
import errorImg from '../imgs/beer-error-icon.png';

export default function BeerCard({ beer }) {
	// const beer = useSelector((state) => state.beers.currentBeer) || null;
	// const loaded = useSelector((state) => state.collections.loaded);
	const { malt, yeast, hops } = beer;
	console.log('beercard', beer);

	return (
		// <>{JSON.stringify(beer)}</>
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
						<h4>Description</h4>
						<p>{beer.description}</p>
						<h4>ABV: </h4>
						<p>{beer.abv}%</p>
						<h4>Malt</h4>
						{/* <p>{malt}</p>
						<h4>Hops:</h4>
						<p>{hops}</p>
						<h4>Yeast:</h4>
						<p>{yeast}</p> */}
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
