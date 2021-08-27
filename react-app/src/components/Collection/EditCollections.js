import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { editCollection } from '../../store/collection';
import Modal from '../Modal';
import './css/EditCollection.css';

export default function EditCollection({
	collection,
	showEditModal,
	setShowEditModal,
	setShowCollectionForm,
	hideClick,
}) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const [collectionName, setCollectionName] = useState(collection.name);

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			editCollection({
				id: collection.id,
				name: collectionName,
			})
		);
		setShowEditModal(false);
		hideClick(collection.id, setShowCollectionForm);
	};

	// animation property
	const editForm = {
		hide: {
			opacity: 0,
			x: -800,
		},
		show: {
			opacity: 1,
			x: 0,
			transition: {
				delay: 0.5,
				type: 'tween',
			},
		},
	};

	const innerForm = (
		<motion.form
			className='edit-collection-form'
			// establish animation props to keys in variant object
			variants={editForm}
			// prevent modal from closing when clicked upon
			onClick={(e) => e.stopPropagation()}
			// already established animation props in parent element
			onSubmit={(e) => onSubmit(e)}
		>
			<h3>Edit Collection</h3>
			<label>Name </label>
			<input
				onChange={({ target: { value } }) => setCollectionName(value)}
				placeholder={collection.name}
				value={collectionName}
				autoFocus
				required
			></input>
			<button type='submit'>Save</button>
		</motion.form>
	);

	return (
		// control animation before or after loading
		<Modal
			setShowModal={setShowEditModal}
			hideClick={hideClick}
			showModal={showEditModal}
			form={collection}
			setShowForm={setShowCollectionForm}
			innerForm={innerForm}
		/>
	);
}
