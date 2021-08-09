import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoUser from '../DemoUser';
import logo from '../imgs/BrewOverLogo.png';
import { motion, AnimatePresence } from 'framer-motion';
import CreateBeer from '../Beer/CreateBeer';
import './Navbar.css';

const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showModal, setShowModal] = useState(true);
	let sessionLinks;
	if (user) {
		sessionLinks = (
			<AnimatePresence>
				<li className='nav1'>
					<NavLink
						to='/collections'
						exact={true}
						activeClassName='active'
					>
						Your Collections
					</NavLink>
				</li>
				<li className='nav1' onClick={() => setShowCreateForm(true)}>
					{/* <NavLink
						to='/beers/create'
						exact={true}
						activeClassName='active'
					>
						Create Beer
						<div></div>
					</NavLink> */}
					Create Beer
					{showCreateForm && (
						<CreateBeer
							setShowModal={setShowModal}
							setShowCreateForm={setShowCreateForm}
							showModal={showModal}
						/>
					)}
				</li>
				<li className='nav1'>
					<NavLink
						to='/collections/create'
						exact={true}
						activeClassName='active'
					>
						Create Collection
					</NavLink>
				</li>
				<li>
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
