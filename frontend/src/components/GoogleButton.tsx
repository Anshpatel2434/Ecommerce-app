import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext, Context } from "../context/AppContext";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Google = Omit<TokenResponse, "error" | "error_description" | "error_uri">;

const GoogleButton: React.FC = () => {
	const navigate = useNavigate();
	const [google, setGoogle] = useState<Google | undefined>(undefined);
	const { setUser, setLoggedIn, tempUser, setTempUser } = useContext(
		AppContext
	) as Context;
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const sendRequest = useGoogleLogin({
		onSuccess: async (tokenResponse: TokenResponse) => {
			const { error, error_description, error_uri, ...userWithoutErrors } =
				tokenResponse;
			setGoogle(userWithoutErrors as Google);
		},
		onError: () =>
			toast((t) => (
				<div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3 w-96">
					<span className="font-bold">Login Failed, Please Login Manually</span>
					<button
						className="ml-2 text-red-500"
						onClick={() => {
							toast.dismiss(t.id);
						}}
					>
						❌
					</button>
				</div>
			)),
	});

	async function loginUser(email: string) {
		console.log("exists?");
		console.log(tempUser.email);
		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/user/checkExist`, {
				email: email,
			});
			console.log("the response from the backend is : ");
			console.log(res.data);
			if (res.data.status == 403) {
				localStorage.setItem("token", res.data.jwt);
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
			} else if (res.data.status == 404) {
				navigate("/askPassword");
			}
		} catch (error) {
			console.log("error while sending request");
			console.log(error);
		}
	}

	useEffect(() => {
		if (google) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${google.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					setTempUser({
						name: res.data.name,
						email: res.data.email,
					});
					loginUser(res.data.email);
				})
				.catch((err) => console.log(err));
		}
	}, [google]);

	return (
		<button
			className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-full shadow-md flex items-center justify-center md:gap-2 transform transition duration-200 hover:scale-105 w-full text-sm md:text-lg"
			onClick={() => sendRequest()}
		>
			<FcGoogle className="mr-[1px] text-[16px] md:text-lg" />
			Sign In with Google
		</button>
	);
};

export default GoogleButton;
