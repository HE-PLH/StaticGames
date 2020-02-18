function Player(map){
    this.dimensions = {
        width: 40,
        height: 40,
    };
    this.position = {
        x: 10,
        y: 0,
    };
    this.velocity = {
        x: 0,
        y: 0,
    };
    this.col = "none";
    this.incr = 2;
}
Player.inherits(GameObject);