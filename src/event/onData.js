import {
  PACKET_TYPE,
  PACKET_TYPE_LENGTH,
  TOTAL_LENGTH,
} from "../constants/header.js";
import { getHandlerById } from "../handler/index.js";
import { packetParser } from "../utils/parser/packetParser.js";
import { getProtoMessages } from "../init/loadProto.js";

// 데이터 스트림으로 서버와 클라이언트가 데이터를 주고 받음.
export const onData = (socket) => (data) => {
  // 기존 버퍼에 새로 수신된 데이터를 추가
  // Buffer.concat은 여러개의 버퍼를 하나로 병합하는 역할을 합니다.
  // 소켓에 이미 수신된 데이터 socket.buffer와 새로 수신된 데이터 data를 Buffer.concat을 통해 하나의 버퍼로 합친후 socket.buffer에 저장합니다.
  socket.buffer = Buffer.concat([socket.buffer, data]);

  // 패킷의 총 헤더길이 (패킷 길이 정보 + 타입 정보)
  // 전체 헤더 길이 = 4 + 1
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  // 버퍼에 최소한 전체 헤더가 있을 때만 패킷을 처리한다.
  while (socket.buffer.length > totalHeaderLength) {
    // 1. 패킷의 전체길이 정보 수신 (4바이트)
    const length = socket.buffer.readUInt32BE(0);
    // 2. 패킷 타입 정보 수신 (1바이트)  패킷의 헤더 길이 만큼 띄우고 8바이트 읽음.
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);

    // 3. 패킷 전체 길이 확인 후 데이터 수신
    if (socket.buffer.length >= length) {
      // subarray(시작, 끝) 시작~끝 부분 반환
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            {
              const protoMessages = getProtoMessages();
              const Ping = protoMessages.common.Ping;
              const pingMessage = Ping.decode(packet);
              const user = getUserBySocket(socket);

              if (!user) {
                throw Error();
              }
              user.handlePong(pingMessage);
            }
            break;
          case PACKET_TYPE.NORMAL: {
            // 패킷 파서 추가 예정
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);
            handler({ socket, userId, payload });
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      break;
    }
  }
};
