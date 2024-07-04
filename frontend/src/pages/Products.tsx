import React, { useEffect, useState } from "react";
import { useItems } from "../hooks/useItems";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { itemInputType } from "@anshpatel2434/ecommerce";
import Loading from "../components/Loading";

const Products: React.FC = () => {
	const { items, loading } = useItems();
	const [cards, setCards] = useState<itemInputType[]>([]);
	function handleCategory(e: React.MouseEvent<HTMLSelectElement, MouseEvent>) {
		const category = e.currentTarget.value;
		if (category === "") {
			setCards(items);
		} else {
			setCards(items.filter((item) => item.category === category));
		}
	}

	useEffect(() => {
		setCards(items);
	}, [loading]);

	return (
		<div className="flex flex-col overflow-x-hidden bg-gray-900 text-white min-h-screen">
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
								onClick={(e) => handleCategory(e)}
							>
								<option value="">All Categories</option>
								<option value="Furniture">Furniture</option>
								<option value="Electric">Electric</option>
								{/* Add more categories as needed */}
							</select>
						</div>
						{/* Items listing */}
						<div className="flex flex-wrap gap-6 justify-center my-5">
							{cards.map((item, index) => (
								<ItemCard
									key={index}
									category={item.category}
									itemName={item.itemName}
									itemPrice={item.itemPrice}
									itemQuantity={item.itemQuantity}
									itemImage={item.itemImage}
								/>
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
