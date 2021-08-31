import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './modal.css';

export default function Modal({
	setErrors,
	form,
	showModal,
	setShowModal,
	setShowForm,
	hideClick,
	innerForm,
}) {
	const background = {
		hide: { opacity: 0 },
		show: { opacity: 1 },
	};

	return (
		// control animation before or after loading
		<AnimatePresence
			exitBeforeEnter
			// change modal state based on changing page or completing form
			onExitComplete={() => {
				setShowModal(false);
				hideClick && form && hideClick(form.id, setShowForm);
				if (setErrors) setErrors([]);
			}}
		>
			{showModal && (
				// background container
				<motion.div
					key='background'
					className='background'
					variants={background}
					// establish animation props to keys in variant object
					initial='hide'
					animate='show'
					exit='hide'
					// exit Modal on click
					onClick={() => {
						setShowModal(false);
					}}
				>
					<div>{innerForm}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
