import React from 'react';
import './footer.css';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-links'>
				<a href='https://github.com/JoeZhang229'>
					<i className='fab fa-github'></i>
				</a>
			</div>
			<div className='footer-links'>
				<a
					href='https://www.linkedin.com/in/joe-zhang-00229/'
					alt='LinkedIn'
				>
					<i className='fab fa-linkedin'></i>
				</a>
			</div>
			<div className='footer-links'>
				<a
					href='https://github.com/JoeZhang229/BrewOver'
					alt='Project Github Repo'
				>
					<i className='fas fa-code-branch'></i>
				</a>
			</div>
		</footer>
	);
}
