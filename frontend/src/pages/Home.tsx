import React, { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

const Home: React.FC = () => {
	const { user, loggedIn } = useContext(AppContext) as Context;

	return (
		<div className="w-screen min-h-screen flex flex-col justify-center items-center">
			<Toaster />
			{loggedIn ? (
				<div
					className="flex flex-col justify-center items-center bg-amber-400 p-4 rounded-lg shadow-md"
					onClick={() => {
						toast("HEHE!", {
							icon: "👏",
						});
					}}
				>
					<div className="text-lg font-bold">{user.name}</div>
					<div className="text-sm text-gray-700">{user.email}</div>

				</div>
			) : (
				<div>Home</div>
			)}
		</div>
	);
};

export default Home;
