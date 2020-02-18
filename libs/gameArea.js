function Area(parentId,width,height,background) {
    this.parent_element = document.getElementById(`${parentId}`);
    this.parent_element.style.overflow = "hidden";
    this.canvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    this.background = background||`url(./media/images/vH8Z10Xh.jpg)`;
    this.canvas.setAttribute("width",`${this.width||400}px`);
    this.canvas.setAttribute("height",`${this.height||this.width}px`);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.background = `${this.background}`;
    this.parent_element.appendChild(this.canvas);
    this.game_properties = {
        gravity: 5,
        dampening: 0.995,
    };
    this.key = {
        down:false,
    }
}