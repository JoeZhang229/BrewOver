import React from 'react';

import SaveBeer from './SaveBeer';
import errorImg from '../imgs/beer-error-icon.png';
import './css/beercard.css';

export default function RandomBeerCard({ beer, success, setSuccess }) {
	const { malt, yeast, hops } = beer.ingredients;

	const destructure = (arr) => {
		const result = new Set();
		arr.forEach((ele) => {
			result.add(ele.name);
		});
		return Array.from(result).join(', ');
	};
	return (
		<div className='beer-card-container'>
			{beer && (
				<div>
					<div className='beer-card'>
						<div className='card-info-container'>
							<div className='beer-card-image'>
								<img
									src={
										beer.image_url
											? beer.image_url
											: errorImg
									}
									alt={beer.description}
								></img>
							</div>
							<div className='beer-card-info'>
								<h3>Name </h3>
								<p>{beer.name}</p>
								<div>
									<h4>ABV </h4>
									<p>ABV: {beer.abv}%</p>
								</div>
								<div>
									<h4>Description </h4>
									<p>{beer.description}</p>
								</div>
								<div>
									<h4>Malt</h4>
									{malt && destructure(malt)}
								</div>
								<div>
									<h4>Hops</h4>
									{hops && destructure(hops)}
								</div>
								<div>
									<h4>Yeast</h4>
									<div>{yeast && yeast}</div>
								</div>
							</div>
						</div>
						<div className='beer-card-btn'>
							<SaveBeer success={success} setSuccess={setSuccess}/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
