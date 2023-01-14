import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Auth from './Auth';
import { Provider } from 'react-redux';
import store from '../../app/store';

const testLogin = 'test login';
const testPassword = 'test password';

const AuthComponent = (
	<Provider store={store}>
		<Auth />
	</Provider>
);

describe('Auth component', () => {
	test('should render values in inputs', async () => {
		render(AuthComponent);
		const loginInput: HTMLInputElement = screen.getByPlaceholderText(/login/i);
		fireEvent.change(loginInput, { target: { value: testLogin } });
		expect(loginInput.value).toBe(testLogin);
		const passwordInput: HTMLInputElement =
			screen.getByPlaceholderText(/password/i);
		fireEvent.change(passwordInput, { target: { value: testPassword } });
		expect(passwordInput.value).toBe(testPassword);
	});
});
