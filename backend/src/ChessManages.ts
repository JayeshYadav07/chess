import { WebSocket } from "ws";
import { Game } from "./Game";

export class ChessManager {
	private games: Game[];
	private users: WebSocket[];
	private pendingUser: WebSocket | null;
	constructor() {
		this.pendingUser = null;
		this.users = [];
		this.games = [];
	}
	addUser(socket: WebSocket) {
		this.users.push(socket);
		this.addHandler(socket);
	}
	private addHandler(socket: WebSocket) {
		socket.on("message", (data) => {
			const message = JSON.parse(data.toString());
			if (message.type === "init_games") {
				if (this.pendingUser) {
					const game = new Game(this.pendingUser, socket);
					this.games.push(game);
					this.pendingUser = null;
				} else {
					this.pendingUser = socket;
				}
			}
			if (message.type === "move") {
				const game = this.games.find(
					(game) => game.player1 === socket || game.player2 === socket
				);

				if (game) {
					game.makeMove(socket, message.move);
				}
			}
		});
	}
	public removeUser(socket: WebSocket) {
		this.users = this.users.filter((user) => user !== socket);
	}
}
