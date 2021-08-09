import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { editCollection } from '../../store/collection';
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

	const background = {
		hide: { opacity: 0 },
		show: { opacity: 1 },
	};

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

	return (
		// control animation before or after loading
		<AnimatePresence
			exitBeforeEnter
			// change modal state based on changing page or completing form
			onExitComplete={() => {
				setShowEditModal(false);
				hideClick(collection.id, setShowCollectionForm);
			}}
		>
			{showEditModal && (
				// background container
				<motion.div
					className='background'
					variants={background}
					// establish animation props to keys in variant object
					initial='hide'
					animate='show'
					exit='hide'
				>
					<motion.form
						className='edit-collection-form'
						variants={editForm}
						// already established animation props in parent element
						onSubmit={(e) => onSubmit(e)}
					>
						<h3>Edit Collection</h3>
						<label>Name </label>
						<input
							onChange={({ target: { value } }) =>
								setCollectionName(value)
							}
							placeholder={collection.name}
							value={collectionName}
							autoFocus
							required
						></input>
						<button type='submit'>Save</button>
					</motion.form>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
