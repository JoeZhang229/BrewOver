import React from 'react';
import './splash.css';
import LoginForm from '../auth/LoginForm';
import { motion } from 'framer-motion';
import splashVideo from '../video/splashVid.mp4';

export default function Splash() {
	// animate elements based on different delays
	const splashAnimations = (delay) => {
		const animation = {
			initial: {
				opacity: 0,
				y: '80px',
			},
			animate: {
				opacity: 0.8,
				y: '230px',
				transition: {
					delay: delay,
					duration: 1,
				},
			},
		};
		return animation;
	};

	return (
		<div className='splash-container'>
			<div className='video-container'>
				<video autoPlay loop muted>
					<source src={splashVideo} type='video/mp4'></source>
				</video>
			</div>
			<div className='title-container'>
				<motion.h1
					variants={splashAnimations(0.25)}
					// establish animation props to keys in variant object
					initial='initial'
					animate='animate'
				>
					Welcome
				</motion.h1>
				<motion.h1
					variants={splashAnimations(0.5)}
					initial='initial'
					animate='animate'
				>
					To
				</motion.h1>
				<motion.h1
					variants={splashAnimations(0.75)}
					initial='initial'
					animate='animate'
				>
					BrewOver
				</motion.h1>
			</div>
			<motion.div
				className='login-container'
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.8 }}
				transition={{ delay: 1, duration: 1 }}
			>
				<LoginForm />
			</motion.div>
		</div>
	);
}
