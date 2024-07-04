import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home: React.FC = () => {
<<<<<<< HEAD
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
=======
	const { user, loggedIn } = useContext(AppContext) as Context;

	return (
		<div className="w-screen min-h-screen flex flex-col justify-center items-center">
			<Toaster />
			{loggedIn ? (
				<div
					className="flex flex-col justify-center items-center bg-amber-400 p-4 rounded-lg shadow-md"
					onClick={() => {
						toast("HEHE!", {
							icon: "👏",
						});
					}}
				>
					<div className="text-lg font-bold">{user.name}</div>
					<div className="text-sm text-gray-700">{user.email}</div>

				</div>
			) : (
				<div>Home</div>
			)}
		</div>
	);
>>>>>>> 0624af4bc89028cc8887ed965cea2e6817d3af3f
};

export default Home;
