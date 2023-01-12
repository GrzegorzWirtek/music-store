import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event';
import Modal from './Modal';

const oneHandler = jest.fn();
const twoHandler = jest.fn();

const ModalProps = {
	modalTitle: 'test title',
	clickOne: oneHandler,
	clickTwo: twoHandler,
	clickOneText: 'test click one text',
	clickTwoText: 'test click two text',
};

const ModalComponent = <Modal {...ModalProps} />;

describe('Modal component', () => {
	test('should display the title passed in props', async () => {
		render(ModalComponent);
		const header = screen.getByRole('heading');
		expect(header).toHaveTextContent(ModalProps.modalTitle);
	});

	test('handlers are called', async () => {
		render(ModalComponent);
		const buttonOne = screen.getByRole('button', {
			name: ModalProps.clickOneText,
		});
		const buttonTwo = screen.getByRole('button', {
			name: ModalProps.clickTwoText,
		});
		await user.click(buttonOne);
		await user.click(buttonTwo);
		expect(oneHandler).toHaveBeenCalledTimes(1);
		expect(twoHandler).toHaveBeenCalledTimes(1);
	});
});
