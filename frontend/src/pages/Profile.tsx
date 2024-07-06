import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("loggedIn") !== "true") navigate("/signup");
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
