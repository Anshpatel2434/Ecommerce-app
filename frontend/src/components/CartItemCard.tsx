import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { itemType } from "../hooks/useItems";
import { useNavigate } from "react-router-dom";

interface CartItemCardProps {
	item: itemType;
	handleRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, handleRemove }) => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		// Set initial width on mount
		setWidth(window.innerWidth);

		// Listen for window resize events
		window.addEventListener("resize", handleResize);

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []); // Empty dependency array ensures this effect runs only once on mount

	const shouldTruncate = width < 500; // Adjust this breakpoint as needed

	return (
		<Card
			isPressable
			onClick={() => {
				setTimeout(() => {
					navigate(`/itemInfo/${item.id}`);
				}, 700);
			}}
			className="w-full h-[20em] mx-auto flex flex-col md:flex-row bg-gray-900 rounded-lg shadow-xl hover:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
		>
			<div className="w-full md:w-[40%] flex ">
				<img
					className="object-cover w-full h-[8rem] md:h-full rounded-lg"
					src={item.itemImage}
					alt={item.itemName}
				/>
			</div>
			<Card className="w-full md:w-[60%] backdrop-filter backdrop-blur-xl text-white rounded-lg">
				<CardHeader className="p-4 border-b border-gray-700">
					<h2 className="text-xl font-semibold">{item.itemName}</h2>
				</CardHeader>
				<CardBody className="md:p-4 p-4 flex flex-col justify-between">
					<p
						className={
							shouldTruncate ? "text-gray-300 truncate" : "text-gray-300"
						}
					>
						{item.itemDescription.substring(0, 250)}...
					</p>
					<div className="flex justify-between items-center md:mt-4 mt-0">
						<div className="text-base md:text-lg font-bold text-blue-400">
							₹{item.itemPrice}
						</div>
						<div className="text-base md:text-lg text-gray-400">
							Qty: {item.itemQuantity}
						</div>
					</div>
					<button
						onClick={(e) => {
							e.stopPropagation(); // Stop event propagation
							handleRemove(item.id);
						}}
						className="mt-3 md:mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
					>
						Remove from Cart
					</button>
				</CardBody>
			</Card>
		</Card>
	);
};

export default CartItemCard;
