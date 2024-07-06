import { useEffect, useState } from "react";
import axios from "axios";

export type profileInput = {
	id: string;
	phone: string;
	city: string;
	state: string;
	country: string;
	pincode: string;
	address: string;
} | null;

export const useProfile = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [loading, setLoading] = useState<boolean>(true);
	const [status, setStatus] = useState(411);
	const [profile, setProfile] = useState<profileInput>(null);

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/profile/getProfile`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setProfile(response.data.profile);
				if (response.data.profile) setStatus(200);
				else setStatus(403);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return {
		loading,
		profile,
		setProfile,
		status,
	};
};
