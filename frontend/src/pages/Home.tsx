import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import RandomItems from "../components/RandomItems";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <RandomItems />
      <Footer />
    </div>
  );
};

export default Home;
