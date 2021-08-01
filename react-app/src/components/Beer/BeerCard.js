import React from 'react';

import CreateBeer from './SaveBeer';

export default function BeerCard({ beer }) {
	return (
		beer && (
			<div className='beer-card'>
				<div>Name: {beer.name}</div>
				<div>Description {beer.description}</div>
				<div>ABV: {beer.abv}%</div>
				{/* <div>
					Food Pairing Suggestions:
					{beer.food_pairing.map((food, idx) => (
						<div key={idx}>{food}</div>
					))}
				</div> */}
				<CreateBeer />
			</div>
		)
	);
}
