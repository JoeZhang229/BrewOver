import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion';

import { createOneBeer, unloadAllBeers, getAllBeers } from '../../store/beer';
import { getOneCollection } from '../../store/collection';
import { createBeerToCollection } from '../../store/collection';
import Modal from '../Modal';
import './css/CreateBeer.css';

export default function CreateBeer({
	setShowModal,
	setShowCreateForm,
	showModal,
}) {
	const history = useHistory();
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;

	const currentCollection = useSelector(
		(state) => state.collections.currentCollection
	);
	const userId = useSelector((state) => state.session.user.id);
	const [errors, setErrors] = useState([]);
	const [beerName, setBeerName] = useState('');
	const [description, setDescription] = useState('');
	const [abv, setabv] = useState('');
	const [collectionVal, setCollectionVal] = useState(collection[0]?.id);
	const [imageUrl, setImageUrl] = useState('');
	const [malt, setMalt] = useState('');
	const [hops, setHops] = useState('');
	const [yeast, setYeast] = useState('');

	// const onClick= async ()

	const onSubmit = async (e) => {
		e.preventDefault();
		// if (collection.length === 0) {
		// 	const newBeer = dispatch(
		// 		createOneBeer({
		// 			description: description,
		// 			name: beerName,
		// 			abv: abv,
		// 			image_url: imageUrl,
		// 			userId: +userId,
		// 			malt: malt,
		// 			hops: hops,
		// 			yeast: yeast,
		// 			type: 'beers',
		// 		})
		// 	);
		// 	setShowModal(false);
		// 	setShowCreateForm(false);
		// 	console.log('beer object', newBeer);
		// return history.push(`/beers/${newBeer.id}`);
		// return 'works';

		if (+abv < 1 || +abv > 100) {
			setErrors(['abv must be between 1 and 100']);
			return;
		}
		if (collection.length === 0) {
			return;
		} else if (+collectionVal === currentCollection.id) {
			const data = await dispatch(
				createOneBeer({
					description: description,
					name: beerName,
					abv: abv,
					image_url: imageUrl,
					collectionId: +collectionVal,
					userId: +userId,
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
			// separate dispatch based on selected Collection
		} else {
			const data = await dispatch(
				createBeerToCollection({
					description: description,
					name: beerName,
					abv: abv,
					image_url: imageUrl,
					collectionId: +collectionVal,
					userId: +userId,
					malt: malt,
					hops: hops,
					yeast: yeast,
					type: 'beers',
				})
			);
			if (data) {
				setErrors(data);
				return;
			}
		}
		setShowModal(false);
		setShowCreateForm(false);
		// reset error on successful submit
		setErrors([]);
		dispatch(unloadAllBeers());
		history.push('/collections');
		// load corresponding collection on created beer
		dispatch(getOneCollection(+collectionVal));
	};

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
			// prevent modal from closing when clicked upon
			onClick={(e) => e.stopPropagation()}
			onSubmit={(e) => onSubmit(e)}
			className='create-beer-form'
			variants={createForm}
			initial='hide'
			animate='show'
			exit='hide'
		>
			<h3>Create Beer</h3>
			<div className='errors'>
				{/* {errors} */}
				{errors.map((error, idx) => (
					<div key={idx}>{error}</div>
				))}
			</div>
			<label>Name </label>
			<input
				onChange={({ target: { value } }) => setBeerName(value)}
				value={beerName}
				required
				autoFocus
			></input>
			<label>Description </label>
			<input
				onChange={({ target: { value } }) => setDescription(value)}
				value={description}
				required
			></input>
			<label>ABV </label>
			<input
				onChange={({ target: { value } }) => setabv(value)}
				value={abv}
				required
			></input>
			<label>image_url </label>
			<input
				onChange={({ target: { value } }) => setImageUrl(value)}
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
			<label>Yeast</label>
			<input
				onChange={({ target: { value } }) => setYeast(value)}
				value={yeast}
			></input>
			{collection.length ? (
				<>
					<label>Collection</label>
					<select onChange={(e) => setCollectionVal(e.target.value)}>
						{collection &&
							collection.map((collect) => (
								<option key={collect.id} value={collect.id}>
									{collect.name}
								</option>
							))}
					</select>
					<button type='submit'>Create</button>
				</>
			) : (
				<div className='no-collections-error'>
					Please create a collection before creating a beer
				</div>
			)}
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
