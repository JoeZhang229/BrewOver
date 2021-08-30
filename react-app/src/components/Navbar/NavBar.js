import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoUser from '../DemoUser';
import logo from '../imgs/BrewOverLogo.png';
import { AnimatePresence } from 'framer-motion';
import CreateBeer from '../Beer/CreateBeer';
import CreateCollections from '../Collection/CreateCollection';
import SignUpForm from '../auth/SignUpForm';
import './Navbar.css';

const NavBar = ({ num, setNum }) => {
	const user = useSelector((state) => state.session.user);

	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showModal, setShowModal] = useState(true);
	const [showCollectionForm, setShowCollectionForm] = useState(false);
	const [signupForm, setSignupForm] = useState(false);
	const [showCollectModal, setShowCollectModal] = useState(true);
	let sessionLinks;
	if (user) {
		sessionLinks = (
			<AnimatePresence
				exitBeforeEnter
				onExitComplete={() => setShowModal(false)}
			>
				<li className='nav1'>
					<NavLink exact to='/collections'>
						Your Collections
					</NavLink>
				</li>
				<li
					className='nav1'
					onClick={() => {
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
				<li onClick={() => setNum(!num)}>
					<NavLink exact to='/beers/random'>
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
					<NavLink exact to='/' className='login'>
						Login
						<div></div>
					</NavLink>
				</li>
				<li
					onClick={() => {
						setSignupForm(true);
						setShowModal(true);
					}}
				>
					{/* <NavLink exact to='/sign-up'> */}
					Sign Up
					{/* </NavLink> */}
				</li>
				{signupForm && (
					<SignUpForm
						setShowModal={setShowModal}
						setSignupForm={setSignupForm}
						showModal={showModal}
					/>
				)}
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
						<Link exact to='/'>
							<img src={logo} alt='logo'></img>
						</Link>
					</div>
				</div>
				<div className='navbar right'>{sessionLinks}</div>
			</ul>
		</nav>
	);
};

export default NavBar;
