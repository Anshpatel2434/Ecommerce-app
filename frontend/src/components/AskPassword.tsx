import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, Context } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AskPassword: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const navigate = useNavigate();
	const { tempUser, setTempUser, setUser, setLoggedIn } = useContext(
		AppContext
	) as Context;

	useEffect(() => {
		if (tempUser.email === "") {
			navigate(-1);
		}
	}, [tempUser]);

	useEffect(() => {
		setTempUser({
			...tempUser,
			password: password,
		});
	}, [password]);

	async function handleSendRequest() {
		if (password === confirmPassword) {
			console.log(
				"in ask password request function and the password matched and the tempuser is: "
			);
			console.log(tempUser);
			try {
				const res = await axios.post(
					`${BACKEND_URL}/api/v1/user/signup`,
					tempUser
				);
				if (res.data.status === 406 || res.data.status === 403) {
					toast((t) => (
						<div className="bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3">
							<span className="font-bold">{res.data.message}</span>
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
				} else if (res.data.jwt) {
					const jwt = res.data.jwt;
					localStorage.setItem("token", jwt);
					toast("YOU HAVE SUCCESSFULLY LOGGED IN!", {
						icon: "✅",
						style: {
							borderRadius: "10px",
							background: "#333",
							color: "#fff",
						},
					});
					setTimeout(() => {
						setLoggedIn(true);
						setUser({
							name: tempUser.name,
							email: tempUser.email,
						});
						navigate("/");
					}, 2000);
				} else {
					alert(res.data.message);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			toast((t) => (
				<div className="bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3">
					<span className="font-bold">The Passwords do not match</span>
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
		<div className="max-w-md mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-lg">
			<Toaster />
			<h2 className="text-2xl font-semibold text-center mb-6">
				Set Your Password
			</h2>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="password"
						className="block text-left font-medium mb-1"
					>
						Enter your password:
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</div>
				<div>
					<label
						htmlFor="confirmPassword"
						className="block text-left font-medium mb-1"
					>
						Confirm your password:
					</label>
					<input
						id="confirmPassword"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</div>
				<button
					onClick={handleSendRequest}
					className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default AskPassword;
