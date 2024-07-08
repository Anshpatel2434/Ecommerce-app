import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import RandomItems from "../components/RandomItems";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-900 flex flex-col overflow-x-hidden">
          <Navbar />
          <Hero />
          <RandomItems />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
