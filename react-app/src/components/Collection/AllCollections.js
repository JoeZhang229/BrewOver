import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimateSharedLayout } from 'framer-motion';
import { motion } from 'framer-motion';
import './css/AllCollections.css';

import {
	getAllCollections,
	deleteCollection,
	getOneCollection,
} from '../../store/collection';
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

	const [showEditModal, setEditModal] = useState(true);

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
	const [showCollectionForm, setShowCollectionForm] = useState(
		initializeForm(collection)
	);
	const [showForm, setShowForm] = useState(initializeForm(collection));

	const [toggleCollection, setToggleCollection] = useState(
		initializeForm(collection)
	);

	console.log('toggle collection state', toggleCollection);

	const handleClick = (id, setState, state) => {
		// for (const key in state) {
		// 	if (key !== id) {
		// 		setState((prev) => ({
		// 			...prev,
		// 			[key]: false,
		// 		}));
		// 	}
		// }
		return setState((prev) => ({
			...prev,
			[id]: true,
		}));
	};

	useEffect(() => {
		// dispatch(getAllCollections());
	}, []);

	const loadCollection = (currentCollection) => {
		return currentCollection?.beers?.map((beer) => (
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
				<button
					key={beer.id}
					onClick={handleClick(beer.id, setShowForm)}
				>
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

	const handleDeleteCollection = (id) => {
		dispatch(deleteCollection(id));
		dispatch(getAllCollections());
	};

	const handleCurrentCollection = (id) => {
		dispatch(getOneCollection(id));
		handleClick(id, setToggleCollection);
	};

	return (
		<div className='allCollections-container'>
			<div className='collections-container'>
				<h3>Your Collections</h3>
				<div className='one-collection-container'>
					{collection &&
						collection.map((collect) => (
							<div className='collection-container'>
								<h3
									onClick={() =>
										handleCurrentCollection(collect.id)
									}
								>
									{collect.name}
								</h3>
								<button
									key={collect.id}
									onClick={() =>
										handleClick(
											collect.id,
											setShowCollectionForm
										)
									}
								>
									Edit
								</button>
								{showCollectionForm[collect.id] && (
									<EditCollection collection={collect} />
								)}
								<button
									onClick={() =>
										handleDeleteCollection(collect.id)
									}
								>
									Delete
								</button>
							</div>
						))}
				</div>
			</div>
			<div>
				<div className='collection-beer-container'>
					{/* <div>{loaded && currentCollection.name}</div> */}
					{/* <div>{JSON.stringify(beer)}</div> */}
					{loaded &&
						currentCollection?.beers?.map((beer) => (
							<div className='collection-beer'>
								<div className='beer-info'>
									{/* <label>Name </label> */}
									<div className='beer-image'>
										<Link
											to={`/beers/${beer.id}`}
											exact={true}
										>
											<img
												src={
													beer.image_url
														? beer.image_url
														: errorImg
												}
												alt='beer'
											></img>
										</Link>
									</div>
									<p>{beer.name}</p>
								</div>
								<p>Description: {beer.description}</p>
								<div className='beer card buttons'>
									<button
										key={beer.id}
										onClick={() =>
											handleClick(beer.id, setShowForm)
										}
									>
										Edit
									</button>
									{showForm[beer.id] && (
										<EditBeer beer={beer} />
									)}
									<button
										onClick={() => handleDelete(beer.id)}
									>
										Delete
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
