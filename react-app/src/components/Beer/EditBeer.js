import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editBeer } from '../../store/beer';
import { motion, AnimatePresence } from 'framer-motion';
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
	const [beerName, setBeerName] = useState(beer.name);
	const [description, setDescription] = useState(beer.description);
	const [abv, setabv] = useState(beer.abv);
	const [imageUrl, setImageUrl] = useState(beer.imageUrl || '');
	const [malt, setMalt] = useState(beer.malt);
	const [hops, setHops] = useState(beer.hops);
	const [yeast, setYeast] = useState(beer.yeast);

	const handleModal = (e) => {
		setShowEditModal(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			editBeer({
				id: +beer.id,
				name: beerName,
				abv: abv,
				description: description,
				image_url: imageUrl,
				malt: malt,
				hops: hops,
				yeast: yeast,
				type: 'beers',
			})
		);
		setShowEditModal(false);
		hideClick(beer.id, setShowBeerForm);
		// dispatch(loadBeers());
		// dispatch(getAllCollections());
	};

	const background = {
		hide: { opacity: 0 },
		show: { opacity: 1 },
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

	return (
		// control animation before or after loading
		<AnimatePresence
			exitBeforeEnter
			// change modal state based on changing page or completing form
			onExitComplete={() => {
				setShowEditModal(false);
				hideClick(beer.id, setShowBeerForm);
			}}
		>
			{showEditModal && (
				// background container
				<motion.div
					className='background'
					variants={background}
					initial='hide'
					animate='show'
					exit='hide'
					// exit Modal on click outside
					onClick={() => handleModal()}
				>
					<motion.form
						key={beer.id}
						className='edit-beer-form'
						variants={editForm}
						// prevent modal from closing when clicked upon
						onClick={(e) => e.stopPropagation()}
						onSubmit={(e) => onSubmit(e)}
					>
						<h3>Edit Beer</h3>
						<label>Name </label>
						<input
							onChange={({ target: { value } }) =>
								setBeerName(value)
							}
							value={beerName}
							autoFocus
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
							onChange={({ target: { value } }) =>
								setImageUrl(value)
							}
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
							onChange={({ target: { value } }) =>
								setYeast(value)
							}
							value={yeast}
						></input>
						<label>Description </label>
						<textarea
							onChange={({ target: { value } }) =>
								setDescription(value)
							}
							rows='5'
							value={description}
							required
						></textarea>
						<button type='submit'>Save</button>
					</motion.form>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
