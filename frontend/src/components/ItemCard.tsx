import React from "react";
import { itemInputType } from "@anshpatel2434/ecommerce";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

const ItemCard: React.FC<itemInputType> = ({
	itemName,
	itemPrice,
	itemQuantity,
	itemImage,
}) => {
	return (
		<Card
			isPressable
			className="w-full md:w-1/2 lg:w-1/4 h-[26em] flex flex-col justify-between items-center bg-gray-800 text-white rounded-2xl shadow-lg transform transition-transform hover:scale-105"
		>
			<CardBody className="overflow-hidden p-0 rounded-t-2xl">
				<img
					width="100%"
					alt={itemName}
					className="w-full object-cover h-[14em] rounded-t-2xl"
					src={itemImage}
				/>
			</CardBody>
			<CardBody className="flex flex-col justify-center items-center p-4">
				<div className="text-xl font-bold">{itemName}</div>
				<div className="flex justify-between w-full mt-2 text-lg">
					<div className="text-green-400">₹{itemPrice}</div>
					<div className="text-gray-400">Quantity: {itemQuantity}</div>
				</div>
			</CardBody>
			<CardFooter className="bg-gray-700 w-full flex justify-center items-center rounded-b-2xl hover:bg-gray-600 transition-all duration-300">
				<button className="w-full py-2 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-400 transition-colors duration-300">
					Add to Cart
				</button>
			</CardFooter>
		</Card>
	);
};

export default ItemCard;
