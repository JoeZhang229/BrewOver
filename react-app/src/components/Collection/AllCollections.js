import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimateSharedLayout } from 'framer-motion';

import { getAllCollections, getCollection } from '../../store/collection';
// import BeerCard from '../Beer/BeerCard';
import { NavLink, Link } from 'react-router-dom';
import { deleteBeer } from '../../store/beer';
import EditBeer from '../Beer/EditBeer';
import EditCollection from '../Collection/EditCollections';
import errorImg from '../imgs/beer-error-icon.png';

export default function AllCollections() {
	const dispatch = useDispatch();
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);
	const loaded = useSelector((state) => state.collections.loaded);
	const [showCollectionForm, setShowCollectionForm] = useState(false);

	const initializeForm = (beers) => {
		if (beers === undefined) {
			return null;
		}
		const beerState = {};
		beers.forEach((beer) => {
			beerState[beer.id] = false;
		});
		return beerState;
	};

	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	const [showForm, setShowForm] = useState(initializeForm(collection));

	const handleClick = (id) => {
		return setShowForm((prev) => ({
			...prev,
			[id]: true,
		}));
	};

	useEffect(() => {
		// dispatch(getAllCollections());
	}, []);

	console.log('showform', showForm);

	const loadCollection = (currentCollection) => {
		return currentCollection.beers?.map((beer) => (
			<div className='collection-beer-card'>
				<div>
					<h3>Name: {beer.name}</h3>
				</div>
				<div>
					<img
						src={beer.image_url ? beer.image_url : errorImg}
						alt={beer.description}
					></img>
				</div>
				<button key={beer.id} onClick={handleClick(beer.id)}>
					Edit
				</button>
				{showForm[beer.id] && (
					<div key={beer.id}>
						<EditBeer beer={beer} />
					</div>
				)}
				<button onClick={() => handleDelete(beer.id)}>Delete</button>
			</div>
		));
	};

	const handleDelete = (id) => {
		dispatch(deleteBeer(id));
		dispatch(getAllCollections());
	};

	const deleteCollection = (id) => {};

	return (
		<div>
			<div>
				Your Collections:
				{collection &&
					collection.map((collect) => (
						<div
							className='collection-container'
							onClick={() => loadCollection(currentCollection)}
						>
							<div>{collect.name}</div>
							<button
								key={collect.id}
								onClick={() => setShowCollectionForm(true)}
							>
								Edit
							</button>
							{showCollectionForm && (
								<EditCollection collection={collection} />
							)}
							<button
								onClick={() => deleteCollection(collect.id)}
							>
								Delete
							</button>
						</div>
					))}
			</div>
			<div>
				Current Collection:
				{/* <div>{loaded && currentCollection.name}</div> */}
				{/* <div>{JSON.stringify(beer)}</div> */}
				{loaded &&
					currentCollection.beers?.map((beer) => (
						<div className='beer card'>
							<Link to={`/beers/${beer.id}`} exact={true}>
								<div>Name: {beer.name}</div>
								<div>Description: {beer.description}</div>
							</Link>
							<div className='beer card buttons'>
								<button
									key={beer.id}
									onClick={() => handleClick(beer.id)}
								>
									Edit
								</button>
								{showForm[beer.id] && <EditBeer beer={beer} />}
								<button onClick={() => handleDelete(beer.id)}>
									Delete
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
