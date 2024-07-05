import React, { useEffect, useState } from "react";
import { itemType, useItems } from "../hooks/useItems";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";

const Products: React.FC = () => {
	const { items, loading } = useItems();
	const [cards, setCards] = useState<itemType[]>([]);
	const [showPopup, setShowPopup] = useState<boolean>(false);

	function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
		const category = e.currentTarget.value;
		if (category === "") {
			setCards(items);
		} else {
			setCards(items.filter((item) => item.category === category));
		}
	}

	useEffect(() => {
		if (showPopup) {
			toast("Item Added To Cart!", {
				icon: "✅",
				style: {
					borderRadius: "10px",
					background: "#333",
					color: "#fff",
				},
			});

			setTimeout(() => {
				setShowPopup(false);
			}, 1000);
		}
	}, [showPopup]);

	useEffect(() => {
		setCards(items);
	}, [items]);

	return (
		<div className="flex flex-col overflow-x-hidden bg-gray-900 text-white min-h-screen">
			<Toaster />
			<Navbar />
			<div className="min-h-screen flex flex-col items-center mt-20">
				{loading ? (
					<Loading />
				) : (
					<div className="w-11/12 flex flex-col items-center">
						{/* Search bar and dropdown */}
						<div className="w-full flex flex-col md:flex-row justify-between items-center my-6">
							<input
								type="text"
								className="w-full md:w-2/5 p-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-gray-500 mb-4 md:mb-0"
								placeholder="Search for products..."
							/>
							<select
								className="w-full md:w-2/5 p-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-gray-500"
								onChange={(e) => handleCategory(e)}
							>
								<option value="">All Categories</option>
								<option value="Furniture">Furniture</option>
								<option value="Electronic">Electronic</option>
								{/* Add more categories as needed */}
							</select>
						</div>
						{/* Items listing */}
						<div className="flex flex-wrap gap-6 justify-center my-5">
							{cards.map((item, index) => (
								<ItemCard key={index} item={item} setShowPopup={setShowPopup} />
							))}
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Products;
