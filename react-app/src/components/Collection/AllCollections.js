import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import './css/AllCollections.css';

import { deleteCollection, getOneCollection } from '../../store/collection';
import { Link } from 'react-router-dom';
import { deleteBeer, loadBeers, unloadAllBeers } from '../../store/beer';
import EditBeer from '../Beer/EditBeer';
import EditCollection from '../Collection/EditCollections';
import errorImg from '../imgs/beer-error-icon.png';

export default function AllCollections() {
	const dispatch = useDispatch();
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);
	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;

	const user = useSelector((state) => state.session.user);

	const beers = useSelector((state) => state.beers.beers) || null;
	const loaded = useSelector((state) => state.collections.loaded);

	const [showEditModal, setShowEditModal] = useState(true);
	const [showEditCollectModal, setShowEditCollectModal] = useState(true);

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

	const [showCollectionForm, setShowCollectionForm] = useState(
		initializeForm(collection)
	);
	const [showBeerForm, setShowBeerForm] = useState(
		initializeForm(collection)
	);

	// stores collection id into an array for differentiating event handling
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
		dispatch(unloadAllBeers());
		if (currentCollection) {
			dispatch(loadBeers(currentCollection.beers));
		} else {
			dispatch(getOneCollection(collection[0]));
		}
	}, [dispatch, currentCollection]);

	const handleDelete = (id) => {
		dispatch(deleteBeer(id, currentCollection.id));
	};

	const handleDeleteCollection = (id) => {
		dispatch(deleteCollection(id));
	};

	const handleCurrentCollection = (id) => {
		// change current collection
		dispatch(getOneCollection(id));
		dispatch(unloadAllBeers());
	};

	return (
		<div className='allCollections-container'>
			<div className='collections-container'>
				<div>
					<h3>Your Collections</h3>
				</div>
				<div className='one-collection-container'>
					{collection.length ? (
						collection.map((collect) => (
							<div
								key={collect.id}
								className='collection-container'
							>
								<h3>{collect.name}</h3>
								<button
									onClick={() =>
										handleCurrentCollection(collect.id)
									}
								>
									View
								</button>
								<button
									key={collect.id}
									onClick={() => {
										showClick(
											collect.id,
											setShowCollectionForm
										);
										setShowEditCollectModal(true);
									}}
								>
									Edit
								</button>
								{showCollectionForm[collect.id] && (
									<EditCollection
										collection={collect}
										showEditModal={showEditCollectModal}
										setShowEditModal={
											setShowEditCollectModal
										}
										setShowCollectionForm={
											setShowCollectionForm
										}
										hideClick={hideClick}
									/>
								)}
								<button
									onClick={() => {
										handleDeleteCollection(collect.id);
										window.location.reload();
									}}
								>
									Delete
								</button>
							</div>
						))
					) : (
						<div>You have no collections!</div>
					)}
				</div>
			</div>
			<div className='collection-beer-container'>
				{loaded && currentCollection ? (
					<h3>{currentCollection.name}</h3>
				) : (
					<h3>No collection selected</h3>
				)}
				<div className='beer-container-scroll'>
					<AnimateSharedLayout>
						<motion.div className='collection-beer-container'>
							{loaded && Object.values(beers).length ? (
								// normalize redux store object into array for frontend rendering
								Object.values(beers).map((beer) => (
									<div className='collection-beer'>
										<div className='beer-container'>
											<div className='beer-image-container'>
												<div className='beer-image'>
													<Link
														exact
														to={`/beers/${beer.id}`}
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
											</div>
											<div className='beer-info'>
												<p>{beer.name}</p>
												<p>{beer.description}</p>
												<p>{beer.abv}% ABV</p>
											</div>
										</div>
										<div className='beer-buttons'>
											{beer.userId === user.id && (
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
											)}
											{showBeerForm[beer.id] && (
												<EditBeer
													beer={beer}
													showEditModal={
														showEditModal
													}
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
												onClick={() => {
													handleDelete(beer.id);
												}}
											>
												Delete
											</button>
										</div>
									</div>
								))
							) : (
								<div className='no-beers'>
									You have no beers saved
								</div>
							)}
						</motion.div>
					</AnimateSharedLayout>
				</div>
			</div>
		</div>
	);
}
