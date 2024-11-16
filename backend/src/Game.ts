import { Chess } from "chess.js";
import { WebSocket } from "ws";
interface Move {
	from: string;
	to: string;
}
export class Game {
	public player1: WebSocket;
	public player2: WebSocket;
	public createdAt: Date;
	public board: Chess;
	constructor(player1: WebSocket, player2: WebSocket) {
		this.player1 = player1;
		this.player2 = player2;
		this.createdAt = new Date();
		this.board = new Chess();

		this.player1.send(
			JSON.stringify({
				type: "init_games",
				data: {
					color: "white",
				},
			})
		);

		this.player2.send(
			JSON.stringify({
				type: "init_games",
				data: {
					color: "black",
				},
			})
		);
	}

	public makeMove(socket: WebSocket, move: Move) {
		// prevent other player from making a move
		if (socket === this.player1 && this.board.turn() !== "w") {
			return;
		}

		if (socket === this.player2 && this.board.turn() !== "b") {
			return;
		}
		try {
			// make a move
			this.board.move({ from: move.from, to: move.to });

			// send move to other player
			this.handleMove(socket, move);

			// isCheckmate
			if (this.board.isCheckmate()) {
				return this.handleCheckmate(socket);
			}

			// isDraw
			if (this.board.isDraw()) {
				return this.handleDraw();
			}
		} catch (error) {
			console.log(error);
			return;
		}
	}
	private handleMove(socket: WebSocket, move: Move) {
		if (socket === this.player1) {
			this.player2.send(
				JSON.stringify({
					type: "move",
					data: move,
				})
			);
		} else {
			this.player1.send(
				JSON.stringify({
					type: "move",
					data: move,
				})
			);
		}
	}
	private handleCheckmate(socket: WebSocket) {
		this.player1.send(
			JSON.stringify({
				type: "game_over",
				data: {
					winner: socket === this.player1 ? "white" : "black",
				},
			})
		);
		this.player2.send(
			JSON.stringify({
				type: "game_over",
				data: {
					winner: socket === this.player1 ? "white" : "black",
				},
			})
		);
	}
	private handleDraw() {
		this.player1.send(
			JSON.stringify({
				type: "game_over",
				data: {
					winner: "draw",
				},
			})
		);
		this.player2.send(
			JSON.stringify({
				type: "game_over",
				data: {
					winner: "draw",
				},
			})
		);
	}
}
