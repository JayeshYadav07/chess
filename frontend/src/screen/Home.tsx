import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
	const navigate = useNavigate();
	return (
		<div className="p-4 max-h-screen max-w-screen-md m-auto grid grid-cols-1 md:grid-cols-2 pt-10 md:gap-5">
			<div className="flex justify-center">
				<img src="/board.png" alt="board.png" width={400} />
			</div>
			<div className="flex flex-col items-center md:items-start justify-center mt-5 md:mt-0 gap-2 md:gap-4">
				<div>
					<h1 className="text-xl md:text-3xl font-bold text-white">
						Welcome to My Chess Game App
					</h1>
				</div>
				<div>
					<Button onClick={() => navigate("/game")}>Join Now</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
