import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllCollections, getCollection } from '../../store/collection';
import BeerCard from '../Beer/BeerCard';
import { deleteBeer } from '../../store/beer';
import EditBeer from '../Beer/EditBeer';

export default function AllCollections() {
	const dispatch = useDispatch();
	// const user = useSelector((state) => state.session.user);
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);
	const loaded = useSelector((state) => state.collections.loaded);
	const [showForm, setShowForm] = useState(false);
	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	// console.log('frontend collection', collection);

	useEffect(() => {
		// dispatch(getAllCollections());
	}, []);

	const handleDelete = (id) => {
		dispatch(deleteBeer(id));
		dispatch(getAllCollections());
	};

	return (
		<div>
			<div>
				Your Collections:
				{collection &&
					collection.map((collect) => (
						<div
						// onClick={dispatch(getCollection(collect))}
						>
							{collect.name}
						</div>
					))}
			</div>
			<div>
				Current Collection:
				<div>{loaded && currentCollection.name}</div>
				{loaded &&
					currentCollection.beers?.map((beer) => (
						<div className='beer card'>
							{/* <div>{JSON.stringify(beer)}</div> */}
							<div>Name: {beer.name}</div>
							<div>Description: {beer.description}</div>
							<button
								key={beer.id}
								onClick={() => setShowForm(true)}
							>
								Edit
							</button>
							{showForm && (
								<div>
									<EditBeer beer={beer} />
								</div>
							)}
							<button onClick={() => handleDelete(beer.id)}>
								Delete
							</button>
						</div>
					))}
			</div>
		</div>
	);
}
