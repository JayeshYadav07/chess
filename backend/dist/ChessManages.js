"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessManager = void 0;
const Game_1 = require("./Game");
class ChessManager {
    constructor() {
        this.pendingUser = null;
        this.users = [];
        this.games = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === "init_games") {
                if (this.pendingUser && this.users.includes(this.pendingUser)) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === "move") {
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
    removeUser(socket) {
        console.log("removeUser");
        this.users = this.users.filter((user) => user !== socket);
    }
}
exports.ChessManager = ChessManager;
