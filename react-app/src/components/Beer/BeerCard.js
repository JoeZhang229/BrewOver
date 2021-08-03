import React from 'react';

import SaveBeer from './SaveBeer';
import { useSelector, useDispatch } from 'react-redux';
import './css/beercard.css';

export default function BeerCard({ beer }) {
	// const beer = useSelector((state) => state.beers.currentBeer) || null;
	const { malt, yeast, hops } = beer;
	return (
		<div className='container'>
			{beer && (
				<div className='beer card'>
					<img
						className='beer card image'
						src={beer.image_url}
						alt={beer.description}
					></img>
					<h3>Name: {beer.name}</h3>
					<div className='beer info'>
						<div>Description {beer.description}</div>
						<div>ABV: {beer.abv}%</div>
						<div></div>
						<div>
							Malt:
							{malt &&
								malt.map((malt, idx) => (
									<div key={idx}>{malt.name}</div>
								))}
						</div>
					</div>
					<SaveBeer />
				</div>
			)}
		</div>
	);
}
