import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

function useSocket() {
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket(WS_URL);

		ws.onopen = () => {
			setSocket(ws);
		};

		ws.onclose = () => {
			setSocket(null);
		};

		// Cleanup on component unmount
		return () => {
			ws.close();
		};
	}, []);

	return socket;
}

export default useSocket;
