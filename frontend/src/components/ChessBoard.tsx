import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

function ChessBoard({
	board,
	socket,
}: {
	board: ({
		square: Square;
		type: PieceSymbol;
		color: Color;
	} | null)[][];
	socket: WebSocket | null;
}) {
	const [from, setFrom] = useState<null | string>(null);
	const [click, setClick] = useState({ i: -1, j: -1 });
	const handleClick = (i: number, j: number) => {
		const squarePos = String.fromCharCode(97 + j) + (8 - i);
		try {
			if (from) {
				const move = {
					from,
					to: squarePos,
				};
				socket?.send(
					JSON.stringify({
						type: "move",
						move,
					})
				);
				setClick({ i: -1, j: -1 });
				setFrom(null);
			} else {
				setClick({ i, j });
				setFrom(squarePos);
			}
		} catch (error: any) {
			setFrom(null);
			alert(error.message);
		}
	};
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
									className={`w-16 h-16 flex items-center justify-center cursor-pointer hover:opacity-85 ${
										click.i == i && click.j == j
											? "bg-red-500"
											: (i + j) % 2 !== 0
											? "bg-green-500"
											: "bg-white"
									} `}
								>
									<img
										src={`${
											square?.color == "b"
												? `/${square.type}.png`
												: `/${square?.type.toUpperCase()}.png`
										}`}
										alt=""
										className="w-2/3"
									/>
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
