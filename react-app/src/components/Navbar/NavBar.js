import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoUser from '../DemoUser';
import logo from '../imgs/BrewOverLogo.png';
import { motion, AnimatePresence } from 'framer-motion';
import CreateBeer from '../Beer/CreateBeer';
import CreateCollections from '../Collection/CreateCollection';
import { getRandomBeer } from '../../store/beer';
import './Navbar.css';

const NavBar = ({ setNum, num }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const [showCreateForm, setShowCreateForm] = useState(false);

	const [showModal, setShowModal] = useState(true);
	const [showCollectionForm, setShowCollectionForm] = useState(false);
	const [showCollectModal, setShowCollectModal] = useState(true);
	let sessionLinks;
	if (user) {
		sessionLinks = (
			<AnimatePresence
				exitBeforeEnter
				onExitComplete={() => setShowModal(false)}
			>
				<li className='nav1'>
					<NavLink
						to='/collections'
						exact={true}
						activeClassName='active'
					>
						Your Collections
					</NavLink>
				</li>
				<li
					className='nav1'
					onClick={() => {
						console.log(
							'nav clicked createform state',
							showCreateForm
						);
						console.log('nav clicked showmodal state', showModal);
						setShowCreateForm(true);
						setShowModal(true);
					}}
				>
					Create Beer
				</li>
				{showCreateForm && (
					<CreateBeer
						setShowModal={setShowModal}
						setShowCreateForm={setShowCreateForm}
						showModal={showModal}
					/>
				)}
				<li
					className='nav1'
					onClick={() => {
						setShowCollectionForm(true);
						setShowCollectModal(true);
					}}
				>
					Create Collection
				</li>
				{showCollectionForm && (
					<CreateCollections
						setShowModal={setShowCollectModal}
						setShowCreateForm={setShowCollectionForm}
						showModal={showCollectModal}
					/>
				)}
				{/* new random beer with every click in navbar*/}
				<li
					// onClick={() => dispatch(getRandomBeer())}
					onClick={() => setNum(!num)}
				>
					<NavLink to='/beers/random' exact={true}>
						Random Beer
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
			</AnimatePresence>
		);
	} else {
		sessionLinks = (
			<>
				<li>
					<NavLink
						to='/'
						exact={true}
						activeClassName='active'
						className='login'
					>
						Login
						<div></div>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/sign-up'
						exact={true}
						activeClassName='active'
					>
						Sign Up
						<div></div>
					</NavLink>
				</li>
				<li>
					<DemoUser />
				</li>
			</>
		);
	}

	return (
		<nav className='navbar'>
			<ul className='navbar navlinks'>
				<div className='navbar left'>
					<div className='navbar logo'>
						<Link to='/' exact={true} activeClassName='active'>
							<img src={logo} alt='logo'></img>
						</Link>
					</div>
				</div>
				<div className='navbar right'>{sessionLinks}</div>
				{/* <div>
					<i class='fas fa-beer'></i>
				</div> */}
			</ul>
		</nav>
	);
};

export default NavBar;
