import { signInType } from "@anshpatel2434/ecommerce";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [userInput, setUserInput] = useState<signInType>({
		email: "",
		password: "",
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		field: "email" | "password"
	) {
		setUserInput({
			...userInput,
			[field]: e.target.value,
		});
	}

	async function sendRequest() {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/signin`,
				userInput
			);
			if (res.data.status == 406) {
				setError(res.data.message);
			} else if (res.data.status == 401) {
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
		<div className=" w-screen min-h-screen relative flex justify-center items-center bg-yellow-400">
			<Toaster />
			<form
				onSubmit={(e) => e.preventDefault()}
				className="w-[40%] h-[25rem] flex flex-col items-center justify-evenly gap-10 bg-green-300"
			>
				<h1 className=" text-3xl">LOGIN</h1>
				{error && (
					<div className="flex justify-between bg-red-600 text-black w-11/12">
						<div className="">{error}</div>
						<RxCross2 onClick={() => setError(null)} />
					</div>
				)}
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
		<div className=" flex justify-between gap-5 w-[] bg-blue-300">
			<label htmlFor={value}>{lable}</label>
			<input
				placeholder={placeholder}
				type={type}
				id={value}
				onChange={onchange}
				className="appearance-none w-[20rem]"
			/>
		</div>
	);
};

export default Signin;
