import { Chess } from "chess.js";
import { useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
function Game() {
	const [chess, setChess] = useState(new Chess());
	const [board, setBoard] = useState(chess.board());
	return (
		<div className="p-4 max-w-screen-lg grid mx-auto grid-cols-5 gap-4 pt-10">
			<div className="col-span-4 flex justify-center">
				<ChessBoard board={board} />
			</div>
			<div className="col-span-1 bg-slate-800 text-white flex justify-center p-4 rounded-sm">
				<div>
					<Button onClick={() => console.log("play")}>Play</Button>
				</div>
			</div>
		</div>
	);
}

export default Game;
