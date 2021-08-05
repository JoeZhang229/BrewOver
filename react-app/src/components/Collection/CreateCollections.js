import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createCollection } from '../../store/collection';

export default function CreateCollections() {
	const dispatch = useDispatch();
    const history = useHistory();
	// selector has second optional function (prevState, incomingState)

	// const collection =
	// 	useSelector((state) => Object.values(state.collections.collections)) ||
	// 	null;
	const [collectionName, setCollectionName] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			createCollection({
				name: collectionName,
			})
		);
		history.push('/collections');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label>Name: </label>
				<input
					onChange={({ target: { value } }) =>
						setCollectionName(value)
					}
					value={collectionName}
					required
				></input>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}
