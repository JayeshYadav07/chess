import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screen/Home";
import Game from "./screen/Game";
export default function App() {
	return (
		<div className=" bg-slate-900 h-screen ">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
