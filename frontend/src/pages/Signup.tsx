import React, { ChangeEvent, useState } from "react";
import { signUpType } from "@anshpatel2434/ecommerce";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import image from "../assets/AuthImage.jpg";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Signup: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [show, setShow] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<signUpType>({
		name: "",
		email: "",
		password: "",
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		field: "name" | "email" | "password"
	) {
		setUserInput({
			...userInput,
			[field]: e.target.value,
		});
	}

	async function sendRequest() {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/signup`,
				userInput
			);
			if (res.data.status === 406 || res.data.status === 403) {
				setError(res.data.message);
				toast((t) => (
					<div className="bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3">
						<span className="font-bold">{error}</span>
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
					navigate("/");
				}, 2000);
			} else {
				alert(res.data.message);
			}
		} catch (error) {
			alert("Error while sending request");
		}
	}

	return (
		<div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-800">
			<Toaster />
			<div className="relative w-full max-w-6xl h-auto max-h-[40rem] bg-gray-900 shadow-2xl flex flex-col md:flex-row rounded-lg overflow-hidden">
				<RxCross2
					className="absolute top-5 left-5 text-white text-3xl hover:cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<div className="w-full flex flex-col justify-evenly items-center md:w-1/2 bg-gray-800 p-8">
					<h2 className="text-4xl font-semibold text-white mb-6">Sign Up</h2>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col justify-center items-center gap-6 w-[60%]"
					>
						<div className="w-full flex flex-col gap-4">
							<LablledInput
								lable="Enter Your Name:"
								placeholder="Naruto Uzumaki"
								value="name"
								onchange={(e) => handleChange(e, "name")}
							/>
							<LablledInput
								lable="Enter Your Email:"
								placeholder="NarutoUzumaki@gmail.com"
								value="email"
								onchange={(e) => handleChange(e, "email")}
							/>
							<div className="relative">
								<LablledInput
									lable="Enter Your Password:"
									placeholder="NarutoUzumaki123"
									value="password"
									onchange={(e) => handleChange(e, "password")}
									type={`${show ? "text" : "password"}`}
								/>
								{show ? (
									<LuEye
										className="absolute text-2xl top-10 right-3 text-white hover:cursor-pointer"
										onClick={() => setShow(!show)}
									/>
								) : (
									<LuEyeOff
										className="absolute text-2xl top-10 right-3 text-white hover:cursor-pointer"
										onClick={() => setShow(!show)}
									/>
								)}
							</div>
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-md transform transition duration-200 hover:scale-105"
								onClick={sendRequest}
							>
								Sign Up
							</button>
						</div>
						<div className="text-gray-500">----------- OR -----------</div>
						<button
							className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-full shadow-md flex items-center justify-center md:gap-2 transform transition duration-200 hover:scale-105 w-full text-sm md:text-lg"
							onClick={sendRequest}
						>
							<FcGoogle className="mr-[1px] text-[16px] md:text-lg" />
							Sign In with Google
						</button>
						<p className="text-gray-300 text-center mt-4">
							Already signed in?{" "}
							<a href="/signin" className="text-blue-400 hover:underline">
								Sign in here
							</a>
						</p>
					</form>
				</div>
				<div
					className="w-full md:w-1/2 md:h-auto md:max-h-full bg-cover bg-center hidden md:block"
					style={{ backgroundImage: `url(${image})` }}
				></div>
			</div>
		</div>
	);
};

interface LablledInput {
	lable: string;
	placeholder: string;
	onchange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	type?: string;
}

const LablledInput = ({
	lable,
	placeholder,
	onchange,
	value,
	type = "text",
}: LablledInput) => {
	return (
		<div className="flex flex-col mb-1">
			<label className="mb-1 text-sm font-medium text-gray-300" htmlFor={value}>
				{lable}
			</label>
			<input
				placeholder={placeholder}
				type={type}
				id={value}
				onChange={onchange}
				className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-500"
			/>
		</div>
	);
};

export default Signup;
