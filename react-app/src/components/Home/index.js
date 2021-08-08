import React from 'react';
import './home.css';
import LoginForm from '../auth/LoginForm';
import { motion } from 'framer-motion';
import homeVideo from '../video/homepageVid.mp4';

export default function Home() {
	return (
		// animate whatever is in Spring
		<div className='home-container'>
			<div className='title-container'>
				<motion.h1
					initial={{ opacity: 0, y: 80 }}
					animate={{ opacity: 0.8, y: 230 }}
					transition={{ delay: 0.25, duration: 1 }}
				>
					Welcome
				</motion.h1>
				<motion.h1
					initial={{ opacity: 0, y: 80 }}
					animate={{ opacity: 0.8, y: 230 }}
					transition={{ delay: 0.5, duration: 1 }}
				>
					To
				</motion.h1>
				<motion.h1
					initial={{ opacity: 0, y: 80 }}
					animate={{ opacity: 0.8, y: 230 }}
					transition={{ delay: 0.75, duration: 1 }}
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
					<source src={homeVideo} type='video/mp4'></source>
				</video>
			</div>
		</div>
	);
}
