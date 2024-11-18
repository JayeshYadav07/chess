import { Color, PieceSymbol, Square } from "chess.js";

function ChessBoard({
	board,
}: {
	board: ({
		square: Square;
		type: PieceSymbol;
		color: Color;
	} | null)[][];
}) {
	return (
		<div>
			{board.map((row, i) => {
				return (
					<div key={i} className="flex">
						{row.map((square, j) => {
							return (
								<div
									key={j}
									className={`w-16 h-16 flex items-center justify-center ${
										(i + j) % 2 !== 0
											? "bg-green-500"
											: "bg-white"
									}`}
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
