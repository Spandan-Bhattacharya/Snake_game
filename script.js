var growth;
var count;
var alive=1;
var snake = {
  xHead: 10,
  yHead: 10,
  xSpeed: 0,
  ySpeed: 0,
  length: 0,
  bodyX: [0],
  bodyY: [0],
};

var food = {
  x: randomGenerator(0, 39) * 10 + 5,
  y: randomGenerator(0, 39) * 10 + 5,
};
function score() {
  document.getElementById("score").innerHTML = "SCORE:" + snake.length;
}
function mover() {
  snake.xHead += snake.xSpeed;
  snake.yHead += snake.ySpeed;
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//  ctx.translate(10, 10);
// die();
function movement() { 
  death();
  eat();
  score();
  if (growth == 0) {
    for (i = 0; i < snake.length - 1; i++) {
      snake.bodyX[i] = snake.bodyX[i + 1];
      snake.bodyY[i] = snake.bodyY[i + 1];
    }
    snake.bodyX[snake.length - 1] = snake.xHead;
    snake.bodyY[snake.length - 1] = snake.yHead;
  } else {
    snake.bodyX[snake.length - 1] = snake.xHead;
    snake.bodyY[snake.length - 1] = snake.yHead;
  }
  mover();
}
function drawer() {
  var i;
  ctx.beginPath();
  ctx.clearRect(-10, -10, 400, 400);
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(food.x, food.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "Red";
  ctx.fill();
  ctx.closePath();
  for (i = 0; i < snake.length; i += 10) {
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect(snake.bodyX[i], snake.bodyY[i], 10, 10);
    ctx.stroke();

    ctx.closePath();
  }
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.rect(snake.xHead, snake.yHead, 10, 10);
  ctx.stroke();
  ctx.closePath();
    if(!alive){
    ctx.beginPath();
    var size=canvas.height/15;
    ctx.font = `normal normal normal ${size}px PS`;
  ctx.fillStyle="white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.closePath();
  }
}

setInterval(drawer, 10);
 setInterval(movement, 10);
function eat() {
  if (
    Math.sqrt(
      Math.pow(snake.xHead + 5 - food.x, 2) +
        Math.pow(snake.yHead + 5 - food.y, 2)
    ) < 10
  ) {
    snake.length += 10;
    growth = 1;
    food.x = randomGenerator(0, 39) * 10 + 5;
    food.y = randomGenerator(0, 39) * 10 + 5;
  } else {
    growth = 0;
  }
}
function right() {
  if (snake.xSpeed == 0) {
    snake.xSpeed = 1;
    snake.ySpeed = 0;
  }
}
function left() {
  if (snake.xSpeed == 0) {
    snake.xSpeed = -1;
    snake.ySpeed = 0;
  }
}
function up() {
  if (snake.ySpeed == 0) {
    snake.xSpeed = 0;
    snake.ySpeed = -1;
  }
}
function down() {
  if (snake.ySpeed == 0) {
    snake.xSpeed = 0;
    snake.ySpeed = 1;
  }
}
function randomGenerator(upper, lower) {
  return Math.floor(Math.random() * (upper - lower) + lower);
}

function death() {
  if (
    snake.xHead > 390 ||
    snake.xHead < 0 ||
    snake.yHead < 0 ||
    snake.yHead > 390
  ) {
    die();
  }
  for (var i = 0; i < snake.length; i++) {
    if (snake.xHead == snake.bodyX[i] && snake.yHead == snake.bodyY[i]) {
      die();
    }
  }
}
function die() {
  //snake.xHead=10;
  //snake.yHead=10;
  alive=0;
  snake.xSpeed = 0;
  snake.ySpeed = 0;
 
}
function reset() {
  snake.xSpeed = 0;
  snake.ySpeed = 0;
  snake.xHead = 10;
  snake.yHead = 10;
  snake.bodyX = [];
  snake.bodyY = [];
  snake.length = 0;
  alive=1;
 
}
document.addEventListener('keydown', (event) => {
    var name = event.key;
  //  var code = event.code;
    if (name === 'w'|| name==='ArrowUp') {
      up();
    }
    if (name === 'a'|| name==='ArrowLeft') {
        left();
      }
      if (name === 's'|| name==='ArrowDown') {
        down();
      }
      if (name === 'd'|| name==='ArrowRight') {
        right();
      }

  }, false);
