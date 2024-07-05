import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Loading from "./Loading";

const ProfileSection = () => {
	const { user } = useContext(AppContext) as Context;
	const [firstname, secondname] = user.name.split(" ");
	return (
		<>
			{user.name !== "" ? (
				<section className="bg-gray-900 mt-16 flex font-medium items-center justify-center min-h-screen">
					<section className="mx-auto bg-gray-800 rounded-2xl flex flex-col justify-center items-center px-8 py-6 shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
						<div className="mt-6 w-fit mx-auto">
							<div className="rounded-full font-playwrite flex items-center justify-center text-3xl text-white w-28 h-28 border-4 border-blue-500">
								{firstname[0] + secondname[0]}
							</div>
						</div>

						<div className="mt-8 text-center">
							<h2 className="text-white font-bold text-2xl tracking-wide">
								{firstname} {secondname}
							</h2>
						</div>

						<div className="mt-4 w-full">
							<table className="text-white text-xl tracking-wide w-full">
								<tbody>
									<tr className="mt-4 flex items-center">
										<td className="flex items-center">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">Country:</span>
										</td>
										<td>India</td>
									</tr>
									<tr className="mt-4 flex items-center">
										<td className="flex items-center">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">State:</span>
										</td>
										<td>Gujarat</td>
									</tr>
									<tr className="mt-4 flex items-center">
										<td className="flex items-center">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">City:</span>
										</td>
										<td>Ahmedabad</td>
									</tr>
									<tr className="mt-4 flex items-center">
										<td className="flex items-center">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">Pincode:</span>
										</td>
										<td>10007</td>
									</tr>
									<tr className="mt-4 flex items-center">
										<td className="flex items-center">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">Phone no.:</span>
										</td>
										<td>9876543221</td>
									</tr>
									<tr className="mt-4 flex flex-col break-all">
										<td className="flex items-center mb-2">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">Email:</span>
										</td>
										<td className="flex">
											{" "}
											<FaArrowRight
												className="mr-2 mt-[0.3rem]"
												size={20}
											/>{" "}
											{user.email}
										</td>
									</tr>
									<tr className="mt-4 flex flex-col break-all whitespace-normal">
										<td className="flex items-center mb-2">
											<FaRegCircleDot
												fill="white"
												size={20}
												className="mt-[0.3rem] mr-3"
											/>
											<span className="text-2xl">Address:</span>
										</td>
										<td className="flex">
											<FaArrowRight className="mr-2 mt-[0.3rem]" size={25} /> 5,
											Nilkanthvarni Society, Opp Vasna Bus Stop, Ahmedabad,
											Gujarat, India
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>
				</section>
			) : (
				<Loading />
			)}
		</>
	);
};

export default ProfileSection;
