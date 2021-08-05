import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editCollection } from '../../store/collection';

export default function EditCollection({ collection }) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const [collectionName, setCollectionName] = useState(collection.name);

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			editCollection({
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
