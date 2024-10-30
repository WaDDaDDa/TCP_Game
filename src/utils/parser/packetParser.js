import { CLIENT_VERSION } from "../../constants/env.js";
import { getProtoTypeNameByHandlerId } from "../../handler/index.js";
import { getProtoMessages } from "../../init/loadProto.js";

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();
  const commonPacket = protoMessages.common.Packet;
  let packet;

  try {
    packet = commonPacket.decode(data);
  } catch (error) {
    console.error(error);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  if (clientVersion !== CLIENT_VERSION) {
    throw Error();
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw Error();
  }

  const [namespace, typeName] = protoTypeName.split(".");
  const payloadType = protoMessages[namespace][typeName];

  let payload;

  try {
    payload = payloadType.decode(packet.payload);
  } catch (error) {
    console.error(error);
  }

  // 뭐가 안왔다
  // 받아야 하는게 없을 수 있다. 없다면?
  const expectedField = Object.keys(payloadType.fields);
  // 파싱이 끝난이후
  const actualFields = Object.keys(payload);
  // 만약에 하나라도 파싱한결과에 없다면
  const missingFields = expectedField.filter(
    (field) => !actualFields.includes(field)
  );

  if (missingFields > 0) {
    throw Error();
  }

  return { handlerId, userId, payload };
};
