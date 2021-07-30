import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

export default function DemoUser() {
	const dispatch = useDispatch();
	const demoLogin = async (e) => {
		e.preventDefault();
		await dispatch(login('demo@aa.io', 'password'));

		return;
	};

	return <button onClick={(e) => demoLogin(e)}>Demo</button>;
}
