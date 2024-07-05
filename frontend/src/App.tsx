import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Loading from "./components/Loading";
import AskPassword from "./components/AskPassword";
import SetProfile from "./pages/SetProfile";
<<<<<<< HEAD
import About from "./pages/About";

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
          <Route path="/about" element={<About />} />
          <Route path="/setProfile" element={<SetProfile />} />
          <Route path="/askPassword" element={<AskPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
=======
import ItemInfo from "./components/ItemInfo";

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
					<Route path="/setProfile" element={<SetProfile />} />
					<Route path="/askPassword" element={<AskPassword />} />
					<Route path="/itemInfo/:id" element={<ItemInfo />} />
				</Routes>
			</BrowserRouter>
		</>
	);
>>>>>>> 4310172866657b4a18997801eacdb0642ecaffff
}
export default App;
