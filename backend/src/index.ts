import { WebSocketServer } from "ws";
import { ChessManager } from "./ChessManages";

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new ChessManager();

wss.on("connection", function connection(ws) {
	gameManager.addUser(ws);
	ws.on("close", () => gameManager.removeUser(ws));
	ws.on("disconnect", () => gameManager.removeUser(ws));
});
