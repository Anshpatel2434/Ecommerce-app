import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { itemType } from "../hooks/useItems";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ItemProps {
	item: itemType;
	setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemCard: React.FC<ItemProps> = ({ item, setShowPopup }) => {
	const navigate = useNavigate();
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	async function handleCartAdd(e: React.MouseEvent) {
		e.stopPropagation(); // Prevent event bubbling
		try {
			console.log("the item in item card");
			console.log(item);
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/cart/addToCart`,
				{
					userId: item.userId,
					id: item.id,
					itemName: item.itemName,
					category: item.category,
					itemPrice: item.itemPrice,
					itemQuantity: item.itemQuantity,
					itemImage: item.itemImage,
					itemDescription: item.itemDescription,
				},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			if (res.status === 403) {
				toast((t) => (
					<div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3 w-96">
						<span className="font-bold">You Are Not Logged In!!</span>
						<button
							className="ml-2 text-red-500"
							onClick={() => {
								toast.dismiss(t.id);
							}}
						>
							❌
						</button>
					</div>
				));
			} else if (res.status === 200) {
				setShowPopup(true);
			}
		} catch (error) {
			toast((t) => (
				<div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3 w-96">
					<span className="font-bold">You Are Not Logged In!!</span>
					<button
						className="ml-2 text-red-500"
						onClick={() => {
							toast.dismiss(t.id);
						}}
					>
						❌
					</button>
				</div>
			));
		}
	}

	return (
		<Card
			isPressable
			className="w-full md:w-1/2 lg:w-1/4 h-[26em] flex flex-col justify-between items-center bg-gray-800 text-white rounded-2xl shadow-lg transform transition-transform hover:scale-105"
			onClick={() => {
				setTimeout(() => {
					navigate(`/itemInfo/${item.id}`);
				}, 700);
			}}
		>
			<CardBody className="overflow-hidden p-0 rounded-t-2xl">
				<img
					width="100%"
					alt={item.itemName}
					className="w-full object-cover h-[14em] rounded-t-2xl"
					src={item.itemImage}
				/>
			</CardBody>
			<CardBody className="flex flex-col justify-center items-center p-4 gap-1">
				<div className="text-xl font-bold">{item.itemName}</div>
				<div className="text-green-400">₹{item.itemPrice}</div>
				<div className="text-sm text-gray-400 text-center">
					{item.itemDescription.substring(0, 80)}...
				</div>
			</CardBody>
			<CardFooter className="bg-gray-700 w-full flex justify-center items-center rounded-b-2xl hover:bg-gray-600 transition-all duration-300">
				<button
					className="w-full py-2 text-white font-semibold bg-blue-700 rounded-md hover:bg-blue-500 transition-colors duration-300"
					onClick={handleCartAdd}
				>
					Add to Cart
				</button>
			</CardFooter>
		</Card>
	);
};

export default ItemCard;
