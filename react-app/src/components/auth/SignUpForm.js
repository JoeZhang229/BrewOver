import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { motion } from 'framer-motion';
import Modal from '../Modal';
import './css/signupform.css';

const SignUpForm = ({ setShowModal, setSignupForm, showModal }) => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors(['Passwords must match!']);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/home' />;
	}

	const signupForm = {
		hide: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 0.5,
				type: 'tween',
			},
		},
	};

	const innerForm = (
		<motion.form
			onSubmit={(e) => onSignUp(e)}
			onClick={(e) => e.stopPropagation()}
			className='signup-form'
			variatnts={signupForm}
			initial='hide'
			animate='show'
			exit='hide'
		>
			<h3>Sign Up</h3>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<label>User Name</label>
			<div className='form-item'>
				<input
					type='text'
					name='username'
					placeholder='Username'
					onChange={updateUsername}
					value={username}
					autoFocus
				></input>
			</div>

			<label>Email</label>
			<input
				type='text'
				name='email'
				placeholder='Email'
				onChange={updateEmail}
				value={email}
			></input>
			<label>Password</label>
			<div className='form-item'>
				<input
					type='password'
					name='password'
					placeholder='Password'
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<label>Repeat Password</label>
			<div className='form-item'>
				<input
					type='password'
					name='repeat_password'
					onChange={updateRepeatPassword}
					value={repeatPassword}
					placeholder='Repeat Password'
					required={true}
				></input>
			</div>
			<button type='submit'>SIGN UP</button>
		</motion.form>
	);

	return (
		<Modal
			setErrors={setErrors}
			showModal={showModal}
			setShowModal={setShowModal}
			setSignupForm={setSignupForm}
			innerForm={innerForm}
		/>
	);

	// return (
	// 	<form onSubmit={onSignUp}>
	// 		<div>
	// 			{errors.map((error, ind) => (
	// 				<div key={ind}>{error}</div>
	// 			))}
	// 		</div>
	// 		<div>
	// 			<label>User Name</label>
	// 			<input
	// 				type='text'
	// 				name='username'
	// 				onChange={updateUsername}
	// 				value={username}
	// 			></input>
	// 		</div>
	// 		<div>
	// 			<label>Email</label>
	// 			<input
	// 				type='text'
	// 				name='email'
	// 				onChange={updateEmail}
	// 				value={email}
	// 			></input>
	// 		</div>
	// 		<div>
	// 			<label>Password</label>
	// 			<input
	// 				type='password'
	// 				name='password'
	// 				onChange={updatePassword}
	// 				value={password}
	// 			></input>
	// 		</div>
	// 		<div>
	// 			<label>Repeat Password</label>
	// 			<input
	// 				type='password'
	// 				name='repeat_password'
	// 				onChange={updateRepeatPassword}
	// 				value={repeatPassword}
	// 				required={true}
	// 			></input>
	// 		</div>
	// 		<button type='submit'>Sign Up</button>
	// 	</form>
	// );
};

export default SignUpForm;
