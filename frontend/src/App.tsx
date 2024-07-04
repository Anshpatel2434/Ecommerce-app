import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Loading from "./components/Loading";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/products" element={<Products />} />
					<Route path="/loading" element={<Loading />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
