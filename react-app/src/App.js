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
import CreateCollections from './components/Collection/CreateCollections';
import Splash from './components/Splash';
import Landing from './components/LandingPage';
import Footer from './components/Footer';
import { authenticate } from './store/session';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

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
			<NavBar />
			<Switch>
				<Route path='/' exact={true}>
					<Splash />
				</Route>
				<Route path='/login' exact={true}>
					<Splash />
				</Route>
				<Route path='/sign-up' exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path='/users' exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path='/users/:userId' exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path='/collections' exact={true}>
					<AllCollections />
				</ProtectedRoute>
				<ProtectedRoute path='/collections/create' exact={true}>
					<CreateCollections />
				</ProtectedRoute>
				<ProtectedRoute path='/beers/create' exact={true}>
					<CreateBeer />
				</ProtectedRoute>
				<ProtectedRoute exact path='/beers/random'>
					<RandomBeer />
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
