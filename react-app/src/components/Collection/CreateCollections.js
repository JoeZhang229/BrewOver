import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link, Redirect } from 'react-router-dom';

import { createCollection } from '../../store/collection';

export default function CreateCollections() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState([]);
	// selector has second optional function (prevState, incomingState)

	// const collection =
	// 	useSelector((state) => Object.values(state.collections.collections)) ||
	// 	null;
	const [collectionName, setCollectionName] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			createCollection({
				name: collectionName,
			})
		);
		if (data) {
			setErrors(data);
			return;
		}

		return history.push('/collections');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					{errors.map((error, idx) => (
						<div key={idx}>{error}</div>
					))}
				</div>
				<label>Name </label>
				<input
					onChange={({ target: { value } }) =>
						setCollectionName(value)
					}
					value={collectionName}
					// required
				></input>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}
