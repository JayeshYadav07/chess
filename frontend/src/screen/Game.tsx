import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import useSocket from "../hooks/useSocket";
import { Chess } from "chess.js";
function Game() {
	const [start, setStart] = useState(false);
	const [wait, setWait] = useState(false);
	const [chess, setChess] = useState(new Chess());
	const [board, setBoard] = useState(chess.board());
	const socket = useSocket();
	useEffect(() => {
		if (!socket) {
			return;
		}

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.type === "init_games") {
				setWait(false);
				setStart(true);
				console.log("init_games");
			} else if (message.type === "move") {
				const move = message.data;
				chess.move(move);
				setBoard(chess.board());
			} else if (message.type === "game_over") {
				console.log("game_over");
			}
		};
	}, [socket]);

	if (!socket) {
		return <div>Connecting...</div>;
	}
	return (
		<div className="p-4 max-w-screen-lg grid mx-auto grid-cols-5 gap-4 pt-10">
			<div className="col-span-4 flex justify-center">
				<ChessBoard board={board} socket={socket} />
			</div>
			<div className="col-span-1 bg-slate-800 text-white flex justify-center p-4 rounded-sm">
				<div>
					{!start && (
						<Button
							onClick={() => {
								if (!wait) {
									setWait(true);
									socket.send(
										JSON.stringify({ type: "init_games" })
									);
								}
							}}
						>
							{wait ? "Waiting..." : "Play"}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Game;
