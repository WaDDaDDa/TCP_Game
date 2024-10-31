class User{
    constructor(socket, id, playerId, latency, coords){
        this.socket = socket;
        this.id = id;
        this.playerId = playerId;
        this.latency =latency;
        this.x = coords.x;
        this.y = coords.y;
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