import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { createOneBeer } from '../../store/beer';
import './css/CreateBeer.css';

export default function CreateBeer({
	setShowModal,
	setShowCreateForm,
	showModal,
}) {
	const dispatch = useDispatch();
	// selector has second optional function (prevState, incomingState)

	const collection =
		useSelector((state) => Object.values(state.collections.collections)) ||
		null;
	const [beerName, setBeerName] = useState('');
	const [description, setDescription] = useState('');
	const [abv, setabv] = useState('');
	const [collectionVal, setCollectionVal] = useState(collection[0]?.id);
	const [imageUrl, setImageUrl] = useState('');
	const [malt, setMalt] = useState('');
	const [hops, setHops] = useState('');
	const [yeast, setYeast] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			createOneBeer({
				description: description,
				name: beerName,
				abv: abv,
				image_url: imageUrl,
				collectionId: +collectionVal,
				malt: malt,
				hops: hops,
				yeast: yeast,
				type: 'beers',
			})
		);
		setShowModal(false);
		setShowCreateForm(false);
	};

	const background = {
		hide: { opacity: 0 },
		show: { opacity: 1 },
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

	return (
		<AnimatePresence
			exitBeforeEnter
			// change modal state based on changing page or completing form
			onExitComplete={() => {
				setShowModal(false);
				setShowCreateForm(false);
			}}
		>
			{showModal && (
				<motion.div
					className='background'
					variants={background}
					initial='hide'
					animate='show'
					exit='hide'
					// exit Modal on click
					onClick={() => {
						setShowModal(false);
						// setShowCreateForm(false);
					}}
				>
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
						<label>Name: </label>
						<input
							onChange={({ target: { value } }) =>
								setBeerName(value)
							}
							value={beerName}
							required
						></input>
						<label>Description: </label>
						<input
							onChange={({ target: { value } }) =>
								setDescription(value)
							}
							value={description}
							required
						></input>
						<label>ABV: </label>
						<input
							onChange={({ target: { value } }) => setabv(value)}
							value={abv}
							required
						></input>
						<label>image_url: </label>
						<input
							onChange={({ target: { value } }) =>
								setImageUrl(value)
							}
							value={imageUrl}
						></input>
						<label>Malt: </label>
						<input
							onChange={({ target: { value } }) => setMalt(value)}
							value={malt}
						></input>
						<label>Hops: </label>
						<input
							onChange={({ target: { value } }) => setHops(value)}
							value={hops}
						></input>
						<label>Yeast: </label>
						<input
							onChange={({ target: { value } }) =>
								setYeast(value)
							}
							value={yeast}
						></input>
						<select
							onChange={(e) => setCollectionVal(e.target.value)}
						>
							{collection &&
								collection.map((collect) => (
									<option key={collect.id} value={collect.id}>
										{collect.name}
									</option>
								))}
						</select>
						<button type='submit'>Create</button>
					</motion.form>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
