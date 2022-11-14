import './Modal.scss';

type ModalProps = {
	modalTitle: string;
	clickOne: () => void;
	clickTwo: () => void;
	clickOneText: string;
	clickTwoText: string;
};

const Modal = ({
	modalTitle,
	clickOne: clickYes,
	clickTwo: clickNo,
	clickOneText,
	clickTwoText,
}: ModalProps) => {
	return (
		<div className='modal'>
			<div className='modal__form'>
				<h3 className='modal__title'>{modalTitle}</h3>
				<button onClick={clickYes} className='modal__button'>
					{clickOneText}
				</button>
				<button onClick={clickNo} className='modal__button'>
					{clickTwoText}
				</button>
			</div>
		</div>
	);
};
export default Modal;
