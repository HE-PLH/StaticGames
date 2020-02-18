function Map(Area) {

    this.arrow_left       = 39;
    this.arrow_right      = 37;
    this.arrow_up         = 38;
    this.arrow_down       = 40;


    this.area = Area;
    this.grid = [];

    this.active_player = null;
    this.barriers = [];
    this.structure = null;
    this.struct = [
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    ];


    //dont let ur play_object be smaller than box
    this.box = {
        width : 0,
        height : 0,
        points:{x:0,y:0},
        fill : "#000",
    };
    this.boxes = {
        count : 0,
        rows: 0,
        cols: 0,
    };
    this.out_of_bound = [];
    this.key = null;
    this.images = this.all_imgs();
    this.tile_img = this.images.tileset_img;
    this.lil_img = this.images.tileset_img;//.get(500, 18, 20, 25);
}

Map.prototype.all_imgs = function () {
    let tree_imgs = [
        this.getImage('./media/images/qGAjmHA.jpg'),
        this.getImage('./media/images/iK0W8Hr.jpg'),
        this.getImage('./media/images/TZWTmCy.png'),
    ];
    return {
        tileset_img : this.getImage('./media/images/oasd3OGh.png'),
        player_img : this.getImage('./media/images/4ShrtWh.png'),
        tree_imgs:tree_imgs,
        enemy_img : this.getImage('./media/images/k631QQ5.png'),
        wall : this.getImage('./media/images/scroll.png'),
    }

};


Map.prototype.getImage = function (src){
    let image = new Image();
    image.src = src;
    return image;
};



Map.prototype.scaled_struct = function () {
    let i;
    for (i=0;i<this.boxes.rows;i++){
        let j;
        for (j = 0;j<this.boxes.cols;j++){
            this.structure[i][j] === 1?this.out_of_bound.push(this.boxes.count):"";
            this.grid.push(this.to_points(this.boxes.count,this.boxes.rows,this.boxes.cols,this.box.width,this.box.height));
            this.boxes.count++;
        }
    }
};
Map.prototype.to_points = function(num,rows,cols,w,h){
    let val=num,times=0;
    while (val>=cols){
        val-=cols;
        times++;
    }
    return {x : (val)*(w),y : times*(h)};
};
Map.prototype.to_num = function(coords,box){
    let g = {
        x: Math.floor(coords.x/box.width),
        y: Math.floor(coords.y/box.height),
    };
    let limit = g.y-1;
    if (limit>=0) {
        return limit*this.boxes.cols+g.x;
    }else{
        return g.x;
    }
};



Map.prototype.boom = function (_active) {
    let pos = _active.position;
    let d = _active.dimensions;
    let h = this.box.height,ob = this.out_of_bound;
    let f = (x,y)=>{return ob.indexOf(this.to_num({x: x, y: y}, this.box)) > -1};
    return (
        f(pos.x, pos.y + h)||
        f(pos.x + d.width / 2,pos.y + h) ||
        f(pos.x + d.width, pos.y + h)||
        f( pos.x + d.width, pos.y + h + h / 2) ||
        f(pos.x, pos.y + d.height + h) ||
        f(pos.x + d.width / 2,pos.y + d.height + h) ||
        f(pos.x + d.width,pos.y + d.height + h) ||
        f(pos.x + d.width, pos.y + d.height + h - h / 2) ||
        pos.y * -1 === pos.y || pos.x * -1 === pos.x ||
        pos.x > this.area.width - _active.dimensions.width ||
        pos.y > this.area.height - _active.dimensions.height
    );

};

Map.prototype.draw = function (coords,box,col) {
    //console.log(col)
    this.area.ctx.fillStyle = col||box.fill;
    this.area.ctx.fillRect(coords.x,coords.y,box.width,box.height);
};

Map.prototype.init = function(map_structure) {
    this.structure = map_structure||this.struct;
    this.boxes.rows = this.structure.length;
    this.boxes.cols = this.structure[0].length;
    this.box.width = this.area.width / this.boxes.cols;
    this.box.height = this.area.height / this.boxes.rows;

    this.scaled_struct();

    this.active_player = new Kiddo(this);

    new Barrier(this,{x:400,y:150}).init();
    new Barrier(this,{x:400,y:200}).init();
    new Barrier(this,{x:400,y:250}).init();
    new Barrier(this,{x:400,y:300}).init();
    new Barrier(this,{x:200,y:100}).init();
    new Barrier(this,{x:280,y:270}).init();
    new Barrier(this,{x:220,y:300}).init();
    new Barrier(this,{x:300,y:100}).init();
    new Rock(this,{x:40,y:180}).init();
    new Rock(this,{x:100,y:150}).init();
    new Rock(this,{x:100,y:50}).init();
    new Rock(this,{x:40,y:300}).init();
    new Rock(this).init();
    this.active_player.init();


    //console.log(new Barrier(this).init({width:100,height:20},{x:30,y:60},{x:1,y:1},"./media/images/flying-twin-headed-dragon-blue.png",5));
    //this.barriers.push(new Barrier(this).init({width:100,height:20},{x:30,y:60},{x:1,y:1},"./media/images/flying-twin-headed-dragon-blue.png",5));
    //this.barriers.push(new Barrier(this).init({width:100,height:20},{x:30,y:120},{x:1,y:1},"./media/images/flying-twin-headed-dragon-blue.png",5));
    //this.barriers.push(new Barrier(this).init({width:100,height:20},{x:30,y:180},{x:1,y:1},"./media/images/flying-twin-headed-dragon-blue.png",5));
    this.refresh();
    this.listen();
};

Map.prototype.redraw_main = function () {
    let i;
    for (i = 0; i < this.boxes.count; i++) {
        if (this.out_of_bound.indexOf(i)>-1) {
            this.draw(this.grid[i], this.box,this.box.fill);
        }
    }
};

Map.prototype.refresh = function () {
    requestAnimationFrame(this.refresh.bind(this));
    this.area.ctx.clearRect(0,0,this.area.canvas.width,this.area.canvas.height);
    this.redraw_main();
    let i,len = this.barriers.length;
    for (i=0;i<len;i++) {
        this.barriers[i].update();
    }
};



Map.prototype._keydown = function (self,e) {
    this.key = e;
    e.preventDefault();
    e.stopPropagation();
};
Map.prototype._keyup = function (self,e) {
    this.key = null;
};

Map.prototype.listen = function (){
    console.log("listening");
    let self = this;
    document.addEventListener("keydown", (e)=>{self._keydown(self,e)});
    document.addEventListener("keyup", (e)=>{self._keyup(self,e)});
};
/*

Map.prototype.get_range = function (directions) {
    let ret= [],len = directions.length;
    //console.log(directions)
    for (let i = 0;i<len;i++){
        ret.push({x:this.grid[directions[i]].x,y:this.grid[directions[i]].y})
    }
    return ret;
}

Map.prototype.any_banned_in = function (obj) {
    let i,len = obj.length,op = 2;
    let pos = this.active_player.position;
    //let flag = pox.x =
    let f =  (this.out_of_bound.indexOf(this.to_num({x:obj[0].x+op,y:obj[0].y+op+this.box.height},this.box))>-1||
        this.out_of_bound.indexOf(this.to_num({x:obj[1].x-op,y:obj[1].y+op+this.box.height},this.box))>-1||
        this.out_of_bound.indexOf(this.to_num({x:obj[2].x+op,y:obj[2].y-op+this.box.height},this.box))>-1||
        this.out_of_bound.indexOf(this.to_num({x:obj[3].x-op,y:obj[3].y-op+this.box.height},this.box))>-1)?true:false;
    return f;
}
*/


/*

Map.prototype.include_as_forbidden_pts = function(coords,box){
    let f = (x,y)=>{this.out_of_bound.push(this.to_num({x:x,y:y},this.box));console.log(x,y)};
    let width_bxs = box.width/this.box.width,x = coords.x,y = coords.y;
    let height_bxs = box.height/this.box.height,cont = [],i,k;
    for (i = 0;i<width_bxs;i++){
        let j;
        x+=this.box.width;
        for (j = 0;j<height_bxs;j++){
            y += this.box.height;
            f(x,y);
        }
    }
    if (box.width-coords.x%this.box.width!==0) {
        let y = coords.y+box.height - this.box.height;
        for (i = 0; i < width_bxs; i++) {
            x+=this.box.width;
            f(x,y);
        }
    }

    if (box.height-coords.y/this.box.height!==0) {
        let x= coords.x+box.width - this.box.width;
        for (k = 0; k < height_bxs; k++) {
            y += this.box.height;
            f(x,y);
        }
    }

    return cont;
};
 */