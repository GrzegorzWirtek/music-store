import './Modal.scss';

type ModalProps = {
	modalTitle: string;
	clickYes: () => void;
	clickNo: () => void;
};

const Modal = ({ modalTitle, clickYes, clickNo }: ModalProps) => {
	return (
		<div className='modal'>
			<div className='modal__form'>
				<h3 className='modal__title'>{modalTitle}</h3>
				<button onClick={clickYes} className='modal__button'>
					Yes
				</button>
				<button onClick={clickNo} className='modal__button'>
					No
				</button>
			</div>
		</div>
	);
};
export default Modal;
