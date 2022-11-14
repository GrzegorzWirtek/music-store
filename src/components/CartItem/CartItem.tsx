import './CartItem.scss';
import { CartContentType } from '../../features/CartContent/CartContent';

type CartItemProps = {
	product: CartContentType;
	increase: (_id: string) => void;
	decrease: (_id: string) => void;
	remove: (_id: string) => void;
};

const CartItem = ({
	product: { _id, name, price, productsInTheCart, imageBase64 },
	increase,
	decrease,
	remove,
}: CartItemProps) => {
	return (
		<div className='cart-item'>
			<div className='cart-item__img-wrapper'>
				<img className='cart-item__img' src={imageBase64} alt={name} />
			</div>

			<h2 className='cart-item__name'>{name}</h2>
			<input
				className='cart-item__remove-img'
				type='image'
				src='delete.svg'
				alt='remove'
				onClick={() => remove(_id)}
			/>
			<p className='cart-item__price'>{price}$</p>

			<div className='cart-item__nr-of-wrapper'>
				<p className='cart-item__nr-of-title'>Quanity</p>
				<button
					className='cart-item__btn cart-item__nr-of-item'
					onClick={() => decrease(_id)}>
					-
				</button>
				<p className='cart-item__number cart-item__nr-of-item'>
					{productsInTheCart}
				</p>
				<button
					className='cart-item__btn cart-item__nr-of-item'
					onClick={() => increase(_id)}>
					+
				</button>
			</div>
		</div>
	);
};
export default CartItem;
