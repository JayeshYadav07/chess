"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ChessManages_1 = require("./ChessManages");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new ChessManages_1.ChessManager();
wss.on("connection", function connection(ws) {
    gameManager.addUser(ws);
    ws.on("disconnect", () => gameManager.removeUser(ws));
});
