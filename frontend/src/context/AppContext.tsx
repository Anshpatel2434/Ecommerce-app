import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

type User = {
	name: string;
	email: string;
};

export interface Context {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
	});
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	async function sendRequest() {
		const res = await axios.get(`${BACKEND_URL}/api/v1/user/getUser`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});
		if (res) {
			setUser(res.data);
			setLoggedIn(true);
		}
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			sendRequest();
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				loggedIn,
				setLoggedIn,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
