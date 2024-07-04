import React, { ChangeEvent, useState } from "react";
import { signUpType } from "@anshpatel2434/ecommerce";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
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
			if (res.data.status == 406) {
				setError(res.data.message);
			} else if (res.data.status == 403) {
				setError(res.data.message);
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
			alert("error while sending request");
		}
	}

	return (
		<div className="w-screen min-h-screen relative flex justify-center items-center bg-yellow-400">
			<Toaster />
			<form
				onSubmit={(e) => e.preventDefault()}
				className=" flex flex-col gap-10 w-70%"
			>
				{error && (
					<div className="flex justify-end bg-red-600 text-black w-11/12">
						<div className="">{error}</div>
						<RxCross2 onClick={() => setError(null)} />
					</div>
				)}
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
				<LablledInput
					lable="Enter Your Password:"
					placeholder="NarutoUzumaki123"
					value="password"
					onchange={(e) => handleChange(e, "password")}
					type="password"
				/>
				<button className="" onClick={sendRequest}>
					Submit
				</button>
			</form>
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
		<div className=" flex gap-5 w-11/12">
			<label htmlFor={value}>{lable}</label>
			<input
				placeholder={placeholder}
				type={type}
				id={value}
				onChange={onchange}
			/>
		</div>
	);
};

export default Signup;
