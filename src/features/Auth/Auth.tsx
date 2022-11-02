import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { auth, AdminData } from './AuthSlice';

const Auth = () => {
	const dispatch = useAppDispatch();
	const {
		admin: { login: loginBool, password: passwordBool },
		firstLoading,
	} = useAppSelector((state) => state.admin);

	const authenticate = (admin: AdminData) => {
		dispatch(auth(admin));
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			login: { value: string };
			password: { value: string };
		};

		const login = target.login.value;
		const password = target.password.value;
		authenticate({ login, password });
	};

	return (
		<form className='auth' onSubmit={handleSubmit}>
			{!loginBool && !firstLoading ? (
				<p className='auth__error'>Błędny login</p>
			) : null}
			<input type='text' name='login' required className='auth__login' />
			{!passwordBool && !firstLoading ? (
				<p className='auth__error'>Błędne hasło</p>
			) : null}
			<input
				type='password'
				name='password'
				required
				className='auth__password'
			/>
			<button className='auth__submit-btn'>Submit</button>
		</form>
	);
};
export default Auth;
