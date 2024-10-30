import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";
import { packetNames } from "../protobuf/packetNames.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, "../protobuf");

// 모든 proto파일을 읽기 위함.
// 폴더안에 폴더안의 proto파일도 읽을 수 있게 작성.
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === ".proto") {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    // 프로토 파일 경로 읽기
    await Promise.all(protoFiles.map((file) => root.load(file)));

    // 패킷읽기
    for (const [packetName, types] of Object.entries(packetNames)) {
      protoMessages[packetName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packetName][type] = root.lookupType(typeName);
      }
    }

    console.log("Protobuf 파일이 로드 되었습니다.");
    // console.log(protoMessages);
  } catch (error) {
    console.error(`Protobuf 파일 로드 중 오류가 발생했습니다.`, error);
  }
};

// 프로토 메세지 객체는 변하면 안된다.
// object freeze 내용물이 변하지 않도록 freeze 해주는 기능 한번 찾아보아라.
export const getProtoMessages = () => {
  return { ...protoMessages };
};
