function Barrier(map,position,dimensions,velocity,incr) {
    this.test =0;
    this.dimensions = dimensions||{
        width: 50,
        height: 50,
    };
    this.position = position||{
        x: 70,
        y: 200,
    };
    this.velocity = velocity||{
        x: 0,
        y: 0,
    };
    this.col = "grey";
    this.incr = incr||2;
}

Barrier.inherits(GameObject);

Barrier.prototype.increment = function(){
    let x = 0, y = 0;
    let bx = this.position.x;
    let by = this.position.y;
    let gravity = map.area.game_properties.gravity;
    let dampening = map.area.game_properties.dampening;

    // if (map.key) {
    //     let key = map.key.keyCode;
    //     let ch = this.incr;
    //     if (key === 87) {
    //         console.log(map.key.keyCode);
    //         map.key.preventDefault();
    //         y += -ch;
    //     }  if (68) {
    //         map.key.preventDefault();
    //         x += -ch;
    //     }  if (83) {
    //         map.key.preventDefault();
    //         y += ch;
    //     }  if (65) {
    //         map.key.preventDefault();
    //         x += ch;
    //     }
    // }


    if (this.test%map.area.width===0){
        this.test=0;
        if (gravity*-1 === gravity){
            gravity = gravity;
        }else{
            gravity = -gravity;
        }

    }
    //add gravity

    x += gravity;
    //y += gravity;
    map.area.game_properties.gravity = gravity;
    //add dampening
    //x *= dampening;
    //y *= dampening;
    this.position = {x: bx+x, y: by+y};
    this.test+=10;
};

//
// Barrier.prototype.update = function () {
//     this.load_img();
// };
