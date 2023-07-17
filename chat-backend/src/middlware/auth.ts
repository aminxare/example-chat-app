import { Socket,  } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { Broker } from "../lib/broker";

const auth = (broker: Broker) => (socket: Socket, next: (err?: ExtendedError | undefined) => void) =>{
    const token = socket.handshake.auth.token;
    if (!token) return socket.emit("connection", null);
    const payload = JSON.stringify({ token, id: socket.id });

    broker.send("validate-token", payload);
    broker.receive().on("token-validated", (payload)=>{
        const user = JSON.parse(payload.message.value?.toString());
        if(user) {
            return next();
        }else {
            return next(new Error("invalid token"))
        }
    })
}

export default auth;