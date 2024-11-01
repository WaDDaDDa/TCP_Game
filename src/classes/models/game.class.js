import { createLocationPacket } from "../../utils/notification/game.notification.js";
import LatencyManager from "../managers/latency.manager.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.latencyManager = new LatencyManager();
  }

  addUser(user) {
    this.users.push(user);

    // bind 사용 이유
    // user.ping 메서드를 addUser에 콜백으로 전달할 때 ping 메서드의 this가 원래의 user 객체를 참조하지 않을 수 있다.
    // JavaScript에서는 함수가 호출될 때 this는 호출한 객체의 컨텍스트를 가지므로, user.ping을 직접 전달하면 this가 user가 아닌 다른 객체로 바뀔 수 있다.
    // 때문에 bind를 사용하여 올바른 this를 유지하도록 하기 위함.
    this.latencyManager.addUser(user.id, user.ping.bind(user), 1000); //1초에 한번
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      if (this.users.length === 1) {
        this.latencyManager.clearAll();
      }
      this.latencyManager.removeUser(this.users[index].id);
      return this.users.splice(index, 1)[0];
    }
  }

  // 본인이외의 유저들을 업데이트. 본인의 유저 아이디를 넣는다.
  // 새로운 배열로 만들어준상태 바이트 배열로 직렬화 해주어야함.
  getAllLocation(userId) {
    const maxLatency = this.getMaxLatency();
    
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        const { x, y } = user.calculatePosition(maxLatency);
        return { id: user.id, playerId: user.playerId, x, y };
      });

    return createLocationPacket(locationData);
  }

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });

    return maxLatency;
  }
}

export default Game;
