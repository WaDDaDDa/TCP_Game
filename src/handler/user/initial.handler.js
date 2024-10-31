import { HANDLER_IDS, RESPONSE_SUCCES_CODE } from "../../constants/handlerIds.js";
import { getGameSession } from "../../sessions/game.session.js";
import { addUser } from "../../sessions/user.session.js";
import { createResponse } from "../../utils/response/createResponse.js";

const initialHandler = ({ socket, userId, payload }) => {
  try {
    // console.log(payload);
    const { deviceId, playerId, latency } = payload;
    const user = addUser(socket, deviceId, playerId, latency);
    const gameSession = getGameSession();
    gameSession.addUser(user);

    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCES_CODE, {
        userId: deviceId,
    });

    socket.write(initialResponse);
  } catch (error) {
    console.error(error);
  }
};

export default initialHandler;
