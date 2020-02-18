function Rock (_this,position,dimensions,velocity,incr){
    this.set_image("./media/images/k631QQ5.png");
    this.position=position||{x: 100, y: 250};
    this.dimensions=dimensions||{width: 40, height: 40};
    this.velocity=velocity||{x: 1, y: 1};
    this.incr=incr||25;
    return this;
}

Rock.inherits(Barrier);