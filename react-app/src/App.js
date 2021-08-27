import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import OneBeer from './components/Beer/OneBeer';
import RandomBeer from './components/Beer/RandomBeer';
import CreateBeer from './components/Beer/CreateBeer';
import AllCollections from './components/Collection/AllCollections';
import CreateCollections from './components/Collection/CreateCollection';
import Splash from './components/Splash';
import Landing from './components/LandingPage';
import Footer from './components/Footer';
import { authenticate } from './store/session';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	// connect dispatch random beer to toggled state for navbar
	const [num, setNum] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar num={num} setNum={setNum} />
			<Switch>
				<Route exact path='/'>
					<Splash />
				</Route>
				<Route exact path='/login'>
					<Splash />
				</Route>
				<Route exact path='/sign-up'>
					<SignUpForm />
				</Route>
				<ProtectedRoute exact path='/users'>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute exact path='/users/:userId'>
					<User />
				</ProtectedRoute>
				<ProtectedRoute exact path='/collections'>
					<AllCollections />
				</ProtectedRoute>
				<ProtectedRoute exact path='/collections/create'>
					<CreateCollections />
				</ProtectedRoute>
				<ProtectedRoute exact path='/beers/create'>
					<CreateBeer />
				</ProtectedRoute>
				<ProtectedRoute exact path='/beers/random'>
					<RandomBeer num={num} />
				</ProtectedRoute>
				<ProtectedRoute exact path='/beers/:id'>
					<OneBeer />
				</ProtectedRoute>
				<ProtectedRoute exact path='/home'>
					<Landing />
				</ProtectedRoute>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
