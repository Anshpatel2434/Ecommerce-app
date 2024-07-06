import React from "react";
import { useCart } from "../hooks/useCart";
import Loading from "../components/Loading";
import CartItemCard from "../components/CartItemCard";

const Cart: React.FC = () => {
	const { cartItems, orderDetails } = useCart();
	console.log(orderDetails.orderContent);

	return (
		<div>
			{cartItems.length === 0 ? (
				<Loading />
			) : (
				<div className="flex gap-1">
					{cartItems.map((item) => (
						<CartItemCard item={item} />
					))}
				</div>
			)}
		</div>
	);
};

export default Cart;
