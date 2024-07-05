import React from "react";
import ProfileInputs from "../components/ProfileInputs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SetProfile: React.FC = () => {
	return (
		<div className="w-screen h-full md:h-screen flex flex-col overflow-x-hidden">
			<Navbar />
			<ProfileInputs />
			<Footer />
		</div>
	);
};

export default SetProfile;
