import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

export const onConnection = (socket) => {
  console.log(
    `Client connected from: ${socket.remoteAddress} : ${socket.remotePort}`
  );

  // socket에는 클라이언트의 정보가 들어있다.
  // socket 에 buffer 를 만들어서 각 클라이언트 소켓에 넣어준다
  // 여기에 너가 보내준 데이터를 넣었다 뺏다 하면서 데이터를 읽을거야 라고 미리 만들어두는것
  socket.buffer = Buffer.alloc(0);

  socket.on("data", onData(socket));
  socket.on("end", onEnd(socket));
  socket.on("error", onError(socket));
};
