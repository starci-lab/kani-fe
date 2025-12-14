import { publicEnv } from "@/modules/env"
import { Manager } from "socket.io-client"

export const createManager = () => {
    console.log(publicEnv().apiBaseUrl.socketIo)
    return new Manager(
        publicEnv().apiBaseUrl.socketIo, 
        {
            transports: ["websocket"],
            reconnection: true,
            autoConnect: false,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        }
    )
}