function Test() {
    this.hello = function(){
        console.log("hi there... we in");
    }
}


function M(news) {
    Test.call(news)

}

M.prototype = new Test();

new M().hello();