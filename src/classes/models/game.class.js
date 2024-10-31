import { createLocationPacket } from "../../utils/notification/game.notification.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }
  
  // 본인이외의 유저들을 업데이트. 본인의 유저 아이디를 넣는다.
  // 새로운 배열로 만들어준상태 바이트 배열로 직렬화 해주어야함.
  getAllLocation(userId) {
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        return { id: user.id, playerId: user.playerId, x: user.x, y: user.y };
      });

    return createLocationPacket(locationData);
  }
}

export default Game;
