import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ProfileSection />
      <Footer />
    </div>
  );
};

export default Profile;
