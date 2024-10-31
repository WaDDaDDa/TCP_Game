import { getGameSession } from "../../sessions/game.session.js";

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if(!gameSession){
        console.error("Game Session Not Found");
    }

    // console.log(gameSession);

    const user = gameSession.getUser(userId);
    if(!user){
        console.error("User Not Found");
    }

    // 내위치 업데이트 하고
    user.updatePosition(x, y);

    // 나 이외의 다른 유저들의 위치 업데이트
    const locationData = gameSession.getAllLocation(userId);

    socket.write(locationData);

  } catch (error) {
    console.error(error);
  }
};

export default locationUpdateHandler;
