import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editCollection } from '../../store/collection';

export default function EditCollection({ collection }) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const [collectionName, setCollectionName] = useState(collection.name);

	console.log('frontend collection', collection);
	console.log('frontend collection ID', collection.id);
	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			editCollection({
				id: collection.id,
				name: collectionName,
			})
		);
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
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}
