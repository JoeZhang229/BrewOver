import React from 'react';
import './landing.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import welcomePageVid from '../video/welcomepageVid.mp4';

export default function Home() {
	// animate elements based on different delays
	const homeAnimations = (delay) => {
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
		<div className='home-container'>
			<div className='title-container'>
				<motion.h1
					variants={homeAnimations(1.25)}
					// establish animation props to keys in variant object
					initial='initial'
					animate='animate'
				>
					Cheers!
				</motion.h1>
				<motion.h1
					variants={homeAnimations(2.5)}
					initial='initial'
					animate='animate'
				>
					Start
				</motion.h1>
				<motion.h1
					variants={homeAnimations(3)}
					initial='initial'
					animate='animate'
				>
					Collecting
				</motion.h1>
			</div>
			<motion.div
				className='random-beer-container'
				initial={{ x: 800 }}
				animate={{ x: -175 }}
				transition={{ delay: 0.4, type: 'tween', duration: 1.1 }}
			>
				<NavLink exact to='/beers/random'>
					<h3>Check out some beers</h3>
				</NavLink>
			</motion.div>
			<div className='home-video-container'>
				<video autoPlay muted>
					<source src={welcomePageVid} type='video/mp4'></source>
				</video>
			</div>
		</div>
	);
}
