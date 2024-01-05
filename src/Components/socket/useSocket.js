import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import { IMAGE_BASEURL } from "../../Redux/API/http-common";

export default function useSocket() {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(null);
    useEffect(() => {
        const socketInstance = new SocketIOClient(IMAGE_BASEURL);
        socketInstance.on("connect", () => {
            setConnected(true)
        });
        socketInstance.on("disconnect", () => { setConnected(false) })
        setSocket(socketInstance);
        return () => socketInstance.disconnect();
    }, [])
    return { socket, connected };
}
