

function init() {
 canvas=document.getElementById("mycanvas");
    //pen
  ctx=canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    food=getRandomfood();
    snake= {
        init_length: 5,
        color: "yellow",
        direction: "right",
        cells: [],
        createSnake: function () {
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({x: i, y: 0});

            }
        },
        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                ctx.fillStyle = this.color;

                ctx.fillRect(this.cells[i].x * 20, this.cells[i].y * 20, 20, 20);
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.cells[i].x * 20, this.cells[i].y * 20, 20, 20);
                ctx.lineWidth = 5;

            }


        },

        updateSnake: function () {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            // nextheadX = headX + 1;


            // this.cells.unshift({x: nextheadX, y: headY});
            if(headX==food.x&&headY==food.y){
                food=getRandomfood();
            }
            else{
                this.cells.pop();
            }
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
           else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
          else  if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
          else{
              nextX=headX;
              nextY=headY-1;
            }

            xcor=[];
            ycor=[];
            for (var i = 1; i <this.cells.length ; i++) {
                xcor[i]=this.cells[i].x;
                ycor[i]=this.cells[i].y;

            }

            for (var i = 1; i <this.cells.length ; i++) {
                if(xcor[i]==nextX&&ycor[i]==nextY){
                    alert("gameOver");
                }

            }
          this.cells.unshift({x:nextX,y:nextY});



        }

        //function Keypressed(e){


    }


    snake.createSnake();




}

function Keydown(e) {
    console.log("You pressed a key")
    console.log(e);
    if(e.key=="ArrowRight"){
        snake.direction="right";
    }
    else if(e.key=="ArrowLeft"){
        snake.direction="left";
    }
    else if(e.key=="ArrowDown"){
        snake.direction="down";
    }
    else{
        snake.direction="up";
    }


}
document.addEventListener('keydown',Keydown);






function draw() {
    ctx.clearRect(0,0,W,H);

    snake.drawSnake();
    ctx.fillStyle=food.color;
    ctx.fillRect(food.x*20,food.y*20,20,20)

}



function update() {
    snake.updateSnake();
    // var headX=this.cells[0].x;
    // var headY=this.cells[0].y;
    // var nextHeadX=headX+1;
    // this.cells.pop();
    // this.cells.unshift({x:nextHeadX,y:headY});



}
function getRandomfood() {
    var foodX=Math.round( Math.random()*(W-20)/20);
    var foodY=Math.round( Math.random()*(H-20)/20 );
    foodColor="yellow";
    var food={
        x:foodX,
        y:foodY,
        color: foodColor,


    }
    return food;


}

function gameloop() {
    draw();
    update();

}

init();
//call gameloop after 100ms
setInterval(gameloop,100);
