import { useEffect, useState } from "react";
import { itemInputType } from "@anshpatel2434/ecommerce";
import axios from "axios";

export const useItems = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<itemInputType[]>([]);

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/item/allItems`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setItems(response.data.items);
				setLoading(false);
			});
	}, []);
	return {
		loading,
		items,
	};
};
