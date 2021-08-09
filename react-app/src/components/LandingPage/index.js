import React from 'react';
import './landing.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import welcomePageVid from '../video/welcomepageVid.mp4';

export default function Home() {
	return (
		// animate whatever is in Spring
		<div className='home-container'>
			<div className='title-container'>
				<motion.h1
					initial={{ opacity: 0, y: 80 }}
					animate={{ opacity: 0.8, y: 230 }}
					transition={{ delay: 1.25, duration: 1 }}
				>
					Cheers!
				</motion.h1>
				<motion.h1
					initial={{ opacity: 0, y: 80 }}
					animate={{ opacity: 0.8, y: 230 }}
					transition={{ delay: 1.75, duration: 1 }}
				>
					Start
				</motion.h1>
				<motion.h1
					initial={{ opacity: 0, y: 80 }}
					animate={{ opacity: 0.8, y: 230 }}
					transition={{ delay: 2, duration: 1 }}
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
				<NavLink to='/beers/random' exact={true}>
					<h3>Check out some beers</h3>
				</NavLink>
			</motion.div>
			<div className='home-video-container'>
				<video autoplay='' muted>
					<source src={welcomePageVid} type='video/mp4'></source>
				</video>
			</div>
		</div>
	);
}
