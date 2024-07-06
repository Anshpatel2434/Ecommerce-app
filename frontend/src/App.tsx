import React, { FC, ReactNode, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Loading from "./components/Loading";
import AskPassword from "./components/AskPassword";
import SetProfile from "./pages/SetProfile";
import About from "./pages/About";
import ItemInfo from "./components/ItemInfo";
import Cart from "./pages/Cart";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	const location = useLocation();
	useLayoutEffect(() => {
		document.documentElement.scrollTo(0, 0);
	}, [location.pathname]);
	return <>{children}</>;
};

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Wrapper>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/products" element={<Products />} />
					<Route path="/loading" element={<Loading />} />
					<Route path="/about" element={<About />} />
					<Route path="/setProfile" element={<SetProfile />} />
					<Route path="/itemInfo/:id" element={<ItemInfo />} />
					<Route path="/askPassword" element={<AskPassword />} />
					<Route path="/myCart" element={<Cart />} />
				</Routes>
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
