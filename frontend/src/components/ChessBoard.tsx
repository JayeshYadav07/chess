import { Chess } from "chess.js";
import { useState } from "react";

function ChessBoard() {
	const [chess, setChess] = useState(new Chess());
	const [from, setFrom] = useState<null | string>(null);

	const handleClick = (i: number, j: number) => {
		const squarePos = String.fromCharCode(97 + j) + (8 - i);
		try {
			if (from) {
				chess.move({ from, to: squarePos });
				setChess(new Chess(chess.fen()));
				setFrom(null);
			} else {
				setFrom(squarePos);
			}
		} catch (error: any) {
			setFrom(null);
			console.error(error.message);
		}
	};
	const board = chess.board();
	return (
		<div>
			{board.map((row, i) => {
				return (
					<div key={i} className="flex">
						{row.map((square, j) => {
							return (
								<div
									onClick={() => {
										handleClick(i, j);
									}}
									key={j}
									className={`w-16 h-16 flex items-center justify-center ${
										(i + j) % 2 !== 0
											? "bg-green-500"
											: "bg-white"
									} `}
								>
									{square?.type}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default ChessBoard;
