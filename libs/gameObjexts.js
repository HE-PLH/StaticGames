function GameObject(map) {
    this.background = "green";
    this.b_collided = false;
    this.w_collided = false;
    
    this.incr = 1;
    this.dimensions = {
        width: 0,
        height: 0,
    };
    this.position = {
        x: 0,
        y: 0,
    };
    this.velocity = {
        x: 0,
        y: 0,
    };
    this.set_image =(img)=>{
        this.background = this.getImage(img)||"./media/images/wall.jpg";
    };
    //this.draw_img(this.position,this.dimensions,this.tile_img,5,[140, 210, 85, 60]);

}

GameObject.prototype.detect_collision = function () {
    let before = this.position;

    this.increment();
    this.detect_obj_collision(this.position,this.dimensions);
    this.detect_walls(this.position);

    if(this.w_collided||this.b_collided){
        this.position = before;
    }
};


GameObject.prototype.getImage = function (src){
    let image = new Image();
    image.src = src;
    return image;
};



GameObject.prototype.detect_obj_collision = function (coords,dimensions,barriers = map.barriers) {
    this.b_collided = false;
    let obj = barriers,len = obj.length,i,flag = false,d = dimensions;
    for (i = 0;i<len;i++){
        let x1 = obj[i].position.x, y1 = obj[i].position.y;
        let x2 = obj[i].position.x+obj[i].dimensions.width,y2 = obj[i].position.y+obj[i].dimensions.height;
        let f = (test)=>{return test.in_range({x:x1,y:y1},{x:x2,y:y2})};
        if(
            f(coords)||
            f({x:coords.x+d.width/2,y:coords.y})||

            f({x:coords.x+d.width,y:coords.y})||
            f({x:coords.x+d.width,y:coords.y+d.height/2})||

            f({x:coords.x+d.width,y:coords.y+d.height})||
            f({x:coords.x+d.width/2,y:coords.y+d.height})||

            f({x:coords.x,y:coords.y+d.height})||
            f({x:coords.x,y:coords.y+d.height/2})
        ){
            this.b_collided = true;
            return true
        }
    }
    return flag;
};

Object.prototype.in_range = function(start,end){
    let _x = this.x>start.x&&this.x<end.x;
    let _y = this.y>start.y&&this.y<end.y;
    return _x&&_y;
};

GameObject.prototype.increment = function () {
    map.area.parent_element.scrollLeft=(this.position.x)-100;
    let x = 0, y = 0;
    let bx = this.position.x;
    let by = this.position.y;

    if (map.key) {
        let key = map.key.keyCode;
        let ch = this.incr;
        if (key === map.arrow_up) {
            map.key.preventDefault();
            y += -ch;
            x += ch;
        }
        if (key === map.arrow_right) {
            map.key.preventDefault();
            x += -ch;
            // y += ch;
        }
        if (key === map.arrow_down) {
            map.key.preventDefault();
            y += ch;
            x += ch;
        }
        if (key === map.arrow_left) {
            map.key.preventDefault();
            x += ch;
            // y += ch;
        }
    }else {
        y+=this.incr/2;//*map.area.game_properties.dampening;
        x += this.incr;
    }

    //add gravity
    y += this.incr/2;
    //add dampening
    //x *= this.area.game_properties.dampening;
    //y *= this.area.game_properties.dampening;
    this.position = {x: bx+x, y: by+y};
};

GameObject.prototype.update = function () {
    this.load_img();
    this.detect_collision();
};

GameObject.prototype.load_img = function () {
    this.draw_image(this.position, this.dimensions,this.background,5);
};

GameObject.prototype.detect_walls = function () {
    this.w_collided = false;
    this.w_collided = map.boom(this);
    return this.w_collided;
    //this.simulate_box(position);
};
GameObject.prototype.init = function () {
    map.barriers.push(this);
    return this;
};

GameObject.prototype.draw_image = function (position,dimensions,image = this.background,sc) {
    map.area.ctx.save();
    let w = dimensions.width/2,
        h = dimensions.height/2,
        scale = sc||5,
        sw = w * scale/(1.7),
        sh = h * scale,
        aspect_ratio = sw / sh;
    sh = sh * aspect_ratio;
    map.area.ctx.drawImage(image, -sw/2+w/2+w, -sh/2 + h/2+h*(scale+1), sw, sh,position.x, position.y,w*2, h*2);
    map.area.ctx.restore();
};
/*
GameObject.prototype.get_boundary = function (ranges,box) {
    let ret= [];
    ret.push({x:ranges[0].x,y:ranges[0].y},
            {x:ranges[1].x+map.box.width,y:ranges[1].y},
            {x:ranges[2].x,y:ranges[2].y+(map.box.height*2)},
            {x:ranges[3].x+map.box.width,y:ranges[3].y+(map.box.height*2)});
    return ret;
}

GameObject.prototype.simulate_box = function (position) {
    let x = position.x,y = position.y;
    let NW = map.to_num({x:x,y:y+map.box.height},map.box),
        NE = map.to_num({x:x+this.dimensions.width,y:y+map.box.height},map.box),
        SW = map.to_num({x:x,y:y+this.dimensions.height},map.box),
        SE = map.to_num({x:x+this.dimensions.width,y:y+this.dimensions.height},map.box);

    let ranges = map.get_range([NW,NE,SW,SE]);

    this.objectArea = this.get_boundary(ranges,map);
    this.collided = map.any_banned_in(this.objectArea);


    map.area.ctx.beginPath();
    map.area.ctx.arc(this.objectArea[0].x,this.objectArea[0].y,10,0,2*Math.PI,false);
    map.area.ctx.fillStyle = "red";
    map.area.ctx.fill();
    map.area.ctx.beginPath();
    map.area.ctx.arc(this.objectArea[1].x,this.objectArea[1].y,10,0,2*Math.PI,false);
    map.area.ctx.fillStyle = "green";
    map.area.ctx.fill();
    map.area.ctx.beginPath();
    map.area.ctx.arc(this.objectArea[2].x,this.objectArea[2].y,10,0,2*Math.PI,false);
    map.area.ctx.fillStyle = "blue";
    map.area.ctx.fill();
    map.area.ctx.beginPath();
    map.area.ctx.arc(this.objectArea[3].x,this.objectArea[3].y,10,0,2*Math.PI,false);
    map.area.ctx.fillStyle = "purple";
    map.area.ctx.fill();
}
*/