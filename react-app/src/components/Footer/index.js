import React from 'react';
import './footer.css';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-links'>
				<a href='https://github.com/JoeZhang229'>
					<i class='fab fa-github'></i>
				</a>
			</div>
			<div className='footer-links'>
				<a
					href='https://www.linkedin.com/in/joe-zhang-00229/'
					alt='LinkedIn'
				>
					<i class='fab fa-linkedin'></i>
				</a>
			</div>
			<div className='footer-links'>
				<a
					href='https://github.com/JoeZhang229/BrewOver'
					alt='Project Github Repo'
				>
					<i class='fas fa-code-branch'></i>
				</a>
			</div>
		</footer>
	);
}
