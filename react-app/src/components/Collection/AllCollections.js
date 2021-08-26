import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import './css/AllCollections.css';

import {
	getAllCollections,
	deleteCollection,
	getOneCollection,
} from '../../store/collection';
// import BeerCard from '../Beer/BeerCard';
import { NavLink, Link } from 'react-router-dom';
import { deleteBeer, getAllBeers, loadBeers } from '../../store/beer';
import EditBeer from '../Beer/EditBeer';
import EditCollection from '../Collection/EditCollections';
import errorImg from '../imgs/beer-error-icon.png';

export default function AllCollections() {
	const dispatch = useDispatch();
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);

	const beers = useSelector((state) => state.beers.beers);
	const loaded = useSelector((state) => state.collections.loaded);

	// console.log('frontend beers', currentCollection.beers);

	const [showEditModal, setShowEditModal] = useState(true);

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

	const collection = useSelector((state) =>
		Object.values(state.collections.collections)
	);
	const [showCollectionForm, setShowCollectionForm] = useState(
		initializeForm(collection)
	);
	const [showBeerForm, setShowBeerForm] = useState(
		initializeForm(collection)
	);

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
		if (currentCollection) {
			// grabs all beers based on collection
			dispatch(loadBeers(currentCollection.beers));
		}
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
					{collection.length ? (
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
						))
					) : (
						<div>You have no collections!</div>
					)}
				</div>
			</div>
			<div>
				<AnimateSharedLayout>
					<motion.div className='collection-beer-container'>
						{
							loaded &&
								// currentCollection?.beers?.length
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
												onClick={() =>
													handleDelete(beer.id)
												}
											>
												Delete
											</button>
										</div>
									</div>
								))
							// : (
							// 	<div className='no-beers'>
							// 		You have no beers saved
							// 	</div>
							// )
						}
					</motion.div>
				</AnimateSharedLayout>
			</div>
		</div>
	);
}
