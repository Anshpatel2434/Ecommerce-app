import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
