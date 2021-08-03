import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllCollections, getCollection } from '../../store/collection';

export default function AllCollections() {
	const dispatch = useDispatch();
	// const user = useSelector((state) => state.session.user);
	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);
	const loaded = useSelector((state) => state.collections.loaded);
	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	// console.log('frontend collection', collection);

	useEffect(() => {
		// dispatch(getAllCollections());
	}, []);
	debugger;

	return (
		<div>
			<div>
				Your Collections:
				{collection &&
					collection.map((collect) => (
						<div onClick={dispatch(getCollection(collect))}>
							{collect.id}
						</div>
					))}
			</div>
			<div>
				{loaded &&
					currentCollection.beers?.map((beer) => (
						<div> {JSON.stringify(beer)}</div>
					))}
			</div>
		</div>
	);
}
