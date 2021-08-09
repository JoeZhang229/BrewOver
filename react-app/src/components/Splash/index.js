import React from 'react';
import './splash.css';
import LoginForm from '../auth/LoginForm';
import { motion } from 'framer-motion';
import splashVideo from '../video/splashVid.mp4';

export default function Splash() {
	const splashAnimations = (delay) => {
		const animation = {
			initial: {
				opacity: 0,
				y: 80,
			},
			animate: {
				opacity: 0.8,
				y: 230,
				transition: {
					delay: delay,
					duration: 1,
				},
			},
		};
		return animation;
	};

	return (
		// animate whatever is in Spring
		<div className='splash-container'>
			<div className='title-container'>
				<motion.h1
					variants={splashAnimations(0.25)}
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
			<div className='video-container'>
				<video autoplay='' loop muted>
					<source src={splashVideo} type='video/mp4'></source>
				</video>
			</div>
		</div>
	);
}
