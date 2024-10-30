import net from "net";
import { HOST, PORT } from "./constants/env.js";
import { onConnection } from "./event/onConnection.js";
import initServer from "./init/index.js";

const server = net.createServer(onConnection);

// 서버가 실행되기 전에 실행되어야 할 것들을 먼저 실행, 완료되면 서버연결
initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`서버가 ${HOST}: ${PORT}에서 실행중입니다.`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
