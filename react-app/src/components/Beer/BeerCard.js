import React from 'react';

import SaveBeer from './SaveBeer';

export default function BeerCard({ beer }) {
	const { malt, yeast, hops } = beer.ingredients;
	return (
		beer && (
			<div className='beer-card'>
				<div>Name: {beer.name}</div>
				<div>Description {beer.description}</div>
				<div>ABV: {beer.abv}%</div>
				<div>
					Food Pairing Suggestions:
					{beer.food_pairing.map((food, idx) => (
						<div key={idx}>{food}</div>
					))}
				</div>
				<div>
					Malt:
					{malt.map((malt, idx) => (
						<div key={idx}>{malt.name}</div>
					))}
				</div>
				<img src={beer.image_url} alt={beer.description}></img>
				<SaveBeer />
			</div>
		)
	);
}
