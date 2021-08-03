import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUser from '../components/DemoUser';

const NavBar = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='/' exact={true} activeClassName='active'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/login' exact={true} activeClassName='active'>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/sign-up'
						exact={true}
						activeClassName='active'
					>
						Sign Up
					</NavLink>
				</li>
				<li>
					<NavLink to='/users' exact={true} activeClassName='active'>
						Users
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
				<li>
					<NavLink to='/beers/create' exact={true}>
						Create Beer
					</NavLink>
				</li>
				<li>
					<NavLink to='/collections' exact={true}>
						Your Collections
					</NavLink>
				</li>
				<li>
					<DemoUser />
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
