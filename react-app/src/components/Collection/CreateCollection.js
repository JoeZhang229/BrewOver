import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from '../Modal';

import { createCollection, getOneCollection } from '../../store/collection';
import './css/CreateCollection.css';

export default function CreateCollections({
	showModal,
	setShowModal,
	setShowCreateForm,
}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState([]);
	// selector has second optional function (prevState, incomingState)
	const [collectionName, setCollectionName] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			createCollection({
				name: collectionName,
			})
		);
		if (data.errors) {
			setErrors(data);
			return;
		}
		setCollectionName('');
		setShowModal(false);
		setErrors([]);
		// newly created collection is selected
		dispatch(getOneCollection(data.id));
		history.push('/collections');
	};

	//animation property
	const createForm = {
		hide: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 0.5,
				type: 'tween',
			},
		},
	};

	const innerForm = (
		<motion.form
			className='create-collection-form'
			variants={createForm}
			onClick={(e) => e.stopPropagation()}
			onSubmit={(e) => {
				onSubmit(e);
			}}
		>
			<h3>Create Collection</h3>
			<div>
				{errors.map((error, idx) => (
					<div key={idx}>{error}</div>
				))}
			</div>
			<label>Name </label>
			<input
				onChange={({ target: { value } }) => setCollectionName(value)}
				placeholder='Collection Name'
				value={collectionName}
				autoFocus
			></input>
			<button type='submit'>Create</button>
		</motion.form>
	);

	return (
		<Modal
			setErrors={setErrors}
			showModal={showModal}
			setShowModal={setShowModal}
			setShowForm={setShowCreateForm}
			innerForm={innerForm}
		/>
	);
}
