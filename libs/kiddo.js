function Kiddo (_this){
    //this.set_image("./media/images/k631QQ5.png");
    this.background = this.getImage("./media/images/k631QQ5.png");
    this.position={x: 500, y: 230};
    this.incr=2;

    return this;
}
Kiddo.inherits(Player);