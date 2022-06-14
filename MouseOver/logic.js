var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
console.log(c);
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
var mouseX = 0;
var mouseY = 0;
c.strokeWidth = 5;
addEventListener("mousemove", function() {
    mouseX=event.clientX;
    mouseY=event.clientY;
});
function getColor() {
    return "rgba(" + getNumber() + "," + getNumber() + "," + getNumber() + "," + getNumber()/255 + ")";
}

function getNumber() {
    return Math.random() * 255;
}


 function Ball() {
    this.radius = Math.random() * 20+14;
    this.x = Math.random() * (tx - Math.random() * 20)+20;
    this.y = Math.random() * (ty - Math.random() * 20);
    this.color = getColor();
    this.startRadius = this.radius;
    this.vel = Math.random() / 5;
    this.dx = Math.random() * 2;
    this.dy = Math.random() * 4;
     this.update = function () {
         c.beginPath();
         c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
         c.fillStyle = this.color;
         c.fill();
     }
}


var balls = [];
for (var i = 0; i < 50; i++) {
    balls.push(new Ball());
}
function animate() {
    if (tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, tx, ty);
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ball.update();
        ball.x = ball.dx + ball.x;
        ball.y = ball.dy + ball.y;
        if (ball.y + ball.radius >= ty) {
            ball.dy = -ball.dy;
        } else {
            ball.dy += ball.vel;
        }
        if (ball.x + ball.radius > tx || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }

        if (mouseX > ball.x - 20 &&
            mouseX < ball.x + 20 &&
            mouseY > ball.y - 50 &&
            mouseY < ball.y + 50 &&
            ball.radius < 70) {
            //bal[i].x += +1;
            ball.radius += 5;
        } else {
            if (ball.radius > ball.startRadius) {
                ball.radius += -5;
            }

        }

    }
    
}

animate();
setInterval(function () {
    balls.push(new Ball());
    balls.splice(0, 1);
}, 400);
