import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DemoUser from '../DemoUser';
import { login } from '../../store/session';
import './css/loginform.css';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/home' />;
	}

	return (
		<form className='login-form' onSubmit={onLogin}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<h3>Login</h3>
			<label htmlFor='email'>Email</label>
			<div className='form-item'>
				<input
					name='email'
					type='text'
					placeholder='Email'
					value={email}
					onChange={updateEmail}
				/>
			</div>
			<label htmlFor='password'>Password</label>
			<div className='form-item'>
				<input
					name='password'
					type='password'
					placeholder='Password'
					value={password}
					onChange={updatePassword}
				/>
			</div>
			<div className='form-item'>
				<button type='submit'>LOGIN</button>
			</div>

			<div className='form-item'>
				<button>
					<DemoUser />
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
