class User{
    constructor(socket, id, playerId, latency){
        this.socket = socket;
        this.id = id;
        this.playerId = playerId;
        this.latency =latency;
        this.x = 0;
        this.y = 0;
        this.updateTimeUpdate();
    }

    updateTimeUpdate(){
        this.lastUpdateTime = Date.now();
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
        this.updateTimeUpdate();
    }
}

export default User;