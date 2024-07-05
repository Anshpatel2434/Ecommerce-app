import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItemInfo } from "../hooks/useItemInfo";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaDollarSign } from "react-icons/fa";

const ItemInfo: React.FC = () => {
	const { id } = useParams();
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const { item, seller, loading } = useItemInfo({ id: id || "" });
	const navigate = useNavigate();

	async function handleCartAdd() {
		try {
			console.log("the item in item info");
			console.log(item);
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/cart/addToCart`,
				{
					id: id,
					userId: item.userId,
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
				console.log(res.data);

				toast("Item Added To Cart!", {
					icon: "✅",
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
			}
		} catch (error) {
			alert("Error while adding to cart");
		}
	}

	return (
		<div className="flex flex-col items-center overflow-x-hidden bg-gray-900 text-white min-h-screen">
			<Toaster />
			<Navbar />
			<div className="flex mt-12 justify-center items-center">
				{loading ? (
					<Loading />
				) : seller == null ? (
					<Loading />
				) : (
					<Card className="flex flex-col md:flex-row w-[90%] md:w-[70%] h-auto bg-gray-800 shadow-lg rounded-lg my-8 overflow-hidden">
						<div className="w-full md:w-1/2 p-4">
							<img
								src={item.itemImage}
								alt={item.itemName}
								className="object-cover w-full h-full rounded-lg"
							/>
						</div>
						<div className="w-full md:w-1/2 flex flex-col p-4 md:p-6">
							<CardHeader className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
								{item.itemName}
							</CardHeader>
							<CardBody className="flex-grow">
								<div className="flex items-center mb-1 md:mb-2 text-blue-500">
									<FaMapMarkerAlt className="mr-1 md:mr-2" />
									<span>{`${seller.city}, ${seller.state}, ${seller.country} - ${seller.pincode}`}</span>
								</div>
								<div className="flex items-center mb-1 md:mb-2 text-blue-500">
									<FaPhoneAlt className="mr-1 md:mr-2" />
									<span>{seller.phone}</span>
								</div>
								<div className="mb-1 md:mb-2">
									<strong>Category: </strong>
									<span>{item.category}</span>
								</div>
								<div className="mb-2 md:mb-4">
									<strong>Description: </strong>
									<span>{item.itemDescription}</span>
								</div>
								<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-4">
									<div className="flex items-center text-green-400 mb-2 md:mb-0">
										<FaDollarSign className="mr-1 md:mr-2" />
										<span className="text-xl font-bold">{item.itemPrice}</span>
									</div>
									<div>
										<strong>Quantity: </strong>
										<span>{item.itemQuantity}</span>
									</div>
								</div>
							</CardBody>
							<CardFooter className="bg-gray-700 w-full flex justify-center items-center rounded-b-2xl hover:bg-gray-600 transition-all duration-300">
								<button
									className="w-full py-2 text-white font-semibold bg-blue-700 rounded-md hover:bg-blue-500 transition-colors duration-300"
									onClick={() => {
										handleCartAdd();
										setTimeout(() => {
											navigate(-1);
										}, 1000);
									}}
								>
									Add to Cart
								</button>
							</CardFooter>
						</div>
					</Card>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ItemInfo;
