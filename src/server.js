import net from "net";
import { HOST, PORT } from "./constants/env.js";
import { onConnection } from "./event/onConnection.js";


const server = net.createServer(onConnection);

server.listen(PORT, HOST, () => {
    console.log(`서버가 ${HOST}: ${PORT}에서 실행중입니다.`);
});