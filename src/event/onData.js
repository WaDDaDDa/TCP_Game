import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";
import { packetParser } from "../utils/parser/packetParser.js";

export const onData = (socket) => (data) => {

// 전체 헤더 길이 = 4 + 1
const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

while(socket.buffer.length > totalHeaderLength){
    // 기존에 있던거에 더해준다.
    socket.buffer = Buffer.concat([socket.buffer, data]);
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8BE(TOTAL_LENGTH);

    if(socket.buffer.length >= length){
        // subarray(시작, 끝) 시작~끝 부분 반환
        const packet = socket.buffer.subarray(totalHeaderLength, length);
        socket.buffer = packet.buffer.subarray(length);
        try {
            switch(packetType){
                case PACKET_TYPE.NORMAL:
                    {
                        // 패킷 파서 추가 예정
                        const result = packetParser(packet);
                        console.log(result);
                    }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

};
