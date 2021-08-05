import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoUser from '../DemoUser';
import logo from '../imgs/BrewOverLogo.png';
import './Navbar.css';

const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	let sessionLinks;
	if (user) {
		sessionLinks = (
			<>
				<li className='nav1'>
					<NavLink
						to='/collections'
						exact={true}
						activeClassName='active'
					>
						Your Collections
					</NavLink>
				</li>
				<li className='nav1'>
					<NavLink
						to='/beers/create'
						exact={true}
						activeClassName='active'
					>
						Create Beer
						<div></div>
					</NavLink>
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
			</>
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
