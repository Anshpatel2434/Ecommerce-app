import { useEffect, useState } from "react";
import { itemInputType } from "@anshpatel2434/ecommerce";
import axios from "axios";

export type itemType = itemInputType & {
	userId: string;
	id: string;
};

export const useItems = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<itemType[]>([]);

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
