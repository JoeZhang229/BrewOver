import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import './css/AllCollections.css';

// import BeerCard from '../Beer/BeerCard';
import { NavLink, Link } from 'react-router-dom';


export default function AllCollections() {
	const dispatch = useDispatch();
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);

	const beers = useSelector((state) => state.beers.beers) || null;
	const loaded = useSelector((state) => state.collections.loaded);


	const showClick = (id, setState) => {
		return setState((prev) => ({
			...prev,
			[id]: true,
		}));
	};

	const hideClick = (id, setState) => {
		return setState((prev) => ({
			...prev,
			[id]: false,
		}));
	};

	useEffect(() => {
		dispatch(loadBeers(currentCollection.beers));
	}, [dispatch, currentCollection]);

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
		// dispatch(getAllBeers());
		// dispatch(loadBeers(currentCollection.beers));
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
									onClick={() => {
										showClick(
											collect.id,
											setShowCollectionForm
										);
										setShowEditModal(true);
									}}
								>
									Edit
								</button>
								{showCollectionForm[collect.id] && (
									<EditCollection
										collection={collect}
										showEditModal={showEditModal}
										setShowEditModal={setShowEditModal}
										setShowCollectionForm={
											setShowCollectionForm
										}
										hideClick={hideClick}
									/>
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
				<AnimateSharedLayout>
					<motion.div className='collection-beer-container'>
						{/* <div>{JSON.stringify(beer)}</div> */}
						{loaded &&
							currentCollection?.beers?.map((beer) => (
								<div className='collection-beer'>
									<div className='beer-info'>
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
									<div className='beer card buttons'>
										<button
											key={beer.id}
											onClick={() => {
												showClick(
													beer.id,
													setShowBeerForm
												);
												setShowEditModal(true);
											}}
										>
											Edit
										</button>
										{showBeerForm[beer.id] && (
											<EditBeer
												beer={beer}
												showEditModal={showEditModal}
												setShowEditModal={
													setShowEditModal
												}
												showBeerForm={showBeerForm}
												setShowBeerForm={
													setShowBeerForm
												}
												hideClick={hideClick}
											/>
										)}
										<button
											onClick={() =>
												handleDelete(beer.id)
											}
										>
											Delete
										</button>
									</div>
								</div>
							))}
					</motion.div>
				</AnimateSharedLayout>
			</div>
		</div>
	);
}
