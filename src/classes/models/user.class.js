import { createPingPacket } from "../../utils/notification/game.notification.js";

class User {
  constructor(socket, id, playerId, latency, coords) {
    this.socket = socket;
    this.id = id;
    this.playerId = playerId;
    this.latency = latency;
    this.x = coords.x;
    this.y = coords.y;
    this.lastX = 0;
    this.lastY = 0;
    this.updateTimeUpdate();
    this.speed = 3;
  }

  updateTimeUpdate() {
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x = x;
    this.y = y;
    this.updateTimeUpdate();
  }

  // ping 패킷을 보내는곳
  ping() {
    const now = Date.now();

    this.socket.write(createPingPacket(now));
  }

  // ping 패킷을 받는곳
  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`${this.id} : ${this.latency}ms`);
  }

  calculatePosition(latency) {
    // 가만히 있는 경우
    if (this.x === this.lastX && this.y === this.lastY) {
      return {
        x: this.x,
        y: this.y,
      };
    }

    const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000; // 1초

    const distance = this.speed * timeDiff;

    const directionX =
      this.x !== this.lastX ? Math.sign(this.x - this.lastX) : 0;
    const directionY =
      this.y !== this.lastY ? Math.sign(this.y - this.lastY) : 0;

    return {
      x: this.x + directionX * distance,
      y: this.y + directionY * distance,
    };
  }
}

export default User;
