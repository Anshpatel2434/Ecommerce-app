import { useEffect, useState } from "react";
import { itemInputType } from "@anshpatel2434/ecommerce";
import axios from "axios";

export type itemType = itemInputType & {
	userId: number;
	id: number;
};

export type sellerType = {
	userId: string;
	city: string;
	state: string;
	country: string;
	pincode: string;
	address: string;
	phone: string;
};

export const useItemInfo = ({ id }: { id: string }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [loading, setLoading] = useState<boolean>(true);
	const [seller, setSeller] = useState<sellerType>({
		userId: "",
		city: "",
		state: "",
		country: "",
		pincode: "",
		address: "",
		phone: "",
	});
	const [item, setItem] = useState<itemType>({
		id: 0,
		userId: 0,
		category: "",
		itemName: "",
		itemPrice: 0,
		itemDescription: "",
		itemImage: "",
		itemQuantity: 0,
	});

	useEffect(() => {
		axios.get(`${BACKEND_URL}/api/v1/item/itemInfo/${id}`).then((response) => {
			setItem(response.data.item);
		});
	}, []);

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/profile/getProfile/${item.userId}`)
			.then((response) => {
				setSeller(response.data.profile);
				setLoading(false);
			});
	}, [item]);

	return {
		loading,
		item,
		seller,
	};
};
