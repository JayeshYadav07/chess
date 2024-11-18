"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.createdAt = new Date();
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: "init_games",
            data: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: "init_games",
            data: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
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
            this.handleMove(move);
            // isCheckmate
            if (this.board.isCheckmate()) {
                return this.handleCheckmate(socket);
            }
            // isDraw
            if (this.board.isDraw()) {
                return this.handleDraw();
            }
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    handleMove(move) {
        this.player2.send(JSON.stringify({
            type: "move",
            data: move,
        }));
        this.player1.send(JSON.stringify({
            type: "move",
            data: move,
        }));
    }
    handleCheckmate(socket) {
        this.player1.send(JSON.stringify({
            type: "game_over",
            data: {
                winner: socket === this.player1 ? "white" : "black",
            },
        }));
        this.player2.send(JSON.stringify({
            type: "game_over",
            data: {
                winner: socket === this.player1 ? "white" : "black",
            },
        }));
    }
    handleDraw() {
        this.player1.send(JSON.stringify({
            type: "game_over",
            data: {
                winner: "draw",
            },
        }));
        this.player2.send(JSON.stringify({
            type: "game_over",
            data: {
                winner: "draw",
            },
        }));
    }
}
exports.Game = Game;
