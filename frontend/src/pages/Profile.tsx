import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext, Context } from "../context/AppContext";

const Profile = () => {
	const navigate = useNavigate();
	const { loggedIn } = useContext(AppContext) as Context;

	useEffect(() => {
		if (!loggedIn) navigate("/");
	}, []);

	return (
		<div className="min-h-screen flex flex-col overflow-x-hidden">
			<Navbar />
			<ProfileSection />
			<Footer />
		</div>
	);
};

export default Profile;
