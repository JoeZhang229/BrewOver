import React from 'react';

import SaveBeer from './SaveBeer';
import { useSelector, useDispatch } from 'react-redux';
import './css/beercard.css';

export default function BeerCard({ beer }) {
	// const beer = useSelector((state) => state.beers.currentBeer) || null;
	const { malt, yeast, hops } = beer;
	return (
		<div className='beer-card-container'>
			{beer && (
				<div>
					<div className='beer-card'>
						<div className='beer-card-image'>
							<img src={beer.image_url} alt='beer'></img>
						</div>
						<div className='beer-card-name'>
							<h3>Name: </h3>
							<p>{beer.name}</p>
						</div>
						<div className='beer-card-info'>
							<div>
								<h4>ABV: </h4>
								<p>ABV: {beer.abv}%</p>
							</div>
							{/* <div>
								Food Pairing Suggestions:
								{beer.food_pairing.map((food, idx) => (
									<div key={idx}>{food}</div>
								))}
							</div> */}
							<div>
								<h4>Description: </h4>
								<p>{beer.description}</p>
							</div>
							<div>
								Malt:
								{malt &&
									malt.map((malt, idx) => (
										<div key={idx}>{malt.name}</div>
									))}
							</div>
						</div>
						<div className='beer-card-btn'>
							<SaveBeer />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
