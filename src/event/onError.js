import { getGameSession } from "../sessions/game.session.js";
import { removeUser } from "../sessions/user.session.js";

export const onError = (socket) => (err) => {
    //세션에서 유저삭제
    removeUser(socket);
    const gameSession = getGameSession();
    gameSession.removeUser(socket);

    return "";
};
