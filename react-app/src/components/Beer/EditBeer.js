import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editBeer } from '../../store/beer';
import { motion } from 'framer-motion';
import Modal from '../Modal';
import './css/EditBeer.css';

export default function EditBeer({
	beer,
	showEditModal,
	setShowEditModal,
	setShowBeerForm,
	hideClick,
}) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const userId = useSelector((state) => state.session.user.id);
	const [errors, setErrors] = useState([]);
	const [beerName, setBeerName] = useState(beer.name || '');
	const [description, setDescription] = useState(beer.description || '');
	// convert decimal from backend to string for form validation
	const [abv, setabv] = useState(beer.abv.toString() || '');
	const [imageUrl, setImageUrl] = useState(beer.image_url || '');
	const [malt, setMalt] = useState(beer.malt || '');
	const [hops, setHops] = useState(beer.hops || '');
	const [yeast, setYeast] = useState(beer.yeast || '');

	const onSubmit = async (e) => {
		e.preventDefault();

		if (+abv < 1 || +abv > 100) {
			setErrors(['abv must be between 1 and 100']);
			return;
		}

		const data = await dispatch(
			editBeer({
				id: +beer.id,
				name: beerName,
				userId: +userId,
				abv: abv,
				description: description,
				image_url: imageUrl,
				malt: malt,
				hops: hops,
				yeast: yeast,
				type: 'beers',
			})
		);
		if (Array.isArray(data)) {
			setErrors(data);
			return;
		}
		setShowEditModal(false);
		setErrors([]);
		hideClick(beer.id, setShowBeerForm);
	};

	const editForm = {
		hide: {
			opacity: 0,
			x: 800,
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
			key={beer.id}
			className='edit-beer-form'
			variants={editForm}
			// prevent modal from closing when clicked upon
			onClick={(e) => e.stopPropagation()}
			onSubmit={(e) => onSubmit(e)}
		>
			<h3>Edit Beer</h3>
			<div className='errors'>
				{errors.map((error, idx) => (
					<div key={idx}>{error}</div>
				))}
			</div>
			<label>Name </label>
			<input
				onChange={({ target: { value } }) => setBeerName(value)}
				value={beerName}
				autoFocus
				required
			></input>
			<label>ABV </label>
			<input
				onChange={({ target: { value } }) => {
					setabv(value);
				}}
				value={abv}
				required
			></input>
			<label>image_url </label>
			<input
				onChange={({ target: { value } }) => {
					setImageUrl(value);
				}}
				value={imageUrl}
			></input>
			<label>Malt </label>
			<input
				onChange={({ target: { value } }) => setMalt(value)}
				value={malt}
			></input>
			<label>Hops </label>
			<input
				onChange={({ target: { value } }) => setHops(value)}
				value={hops}
			></input>
			<label>Yeast </label>
			<input
				onChange={({ target: { value } }) => setYeast(value)}
				value={yeast}
			></input>
			<label>Description </label>
			<textarea
				onChange={({ target: { value } }) => setDescription(value)}
				rows='5'
				value={description}
				required
			></textarea>
			<button type='submit'>Save</button>
		</motion.form>
	);

	return (
		<Modal
			setErrors={setErrors}
			showModal={showEditModal}
			setShowModal={setShowEditModal}
			setShowBeerForm={setShowBeerForm}
			innerForm={innerForm}
			hideClick={hideClick}
		/>
	);
}
