// redis, assets 서버가 켜짐과 동시에 로드가 되는 내용을 init에 추가했었다.

import { addGameSession } from "../sessions/game.session.js";
import { loadProtos } from "./loadProto.js";
import { v4 as uuidv4} from "uuid";

const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uuidv4();
    // 서버가 열리면 게임이 생성된다.
    const gameSession = addGameSession(gameId);
    // console.log(gameSession);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default initServer;
