import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllCollections } from '../../store/collection';

export default function AllCollections() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	// const collection =
	// useSelector((state) => state.collections.collections) || null;
	// console.log('frontend collection', collection);

	useEffect(() => {
		dispatch(getAllCollections(user.id));
	}, [dispatch, user]);

	return (
		<div>
			Your Collections:
			<div></div>
		</div>
	);
}
