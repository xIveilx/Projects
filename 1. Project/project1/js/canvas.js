var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
console.log(canvas);

function Circle(x, y, dx, dy, r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2 , false);
        c.strokeStyle = 'red';
        c.stroke();
    }

    this.update = function(){
        if(this.x + this.r > innerWidth || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var circleArray = [];

for (var i = 0; i < 150; i++) {
    var r = 30;
    var x = Math.random() * (innerWidth - r * 2) + r;
    var y = Math.random() * (innerHeight - r * 2) + r;
    var speed = Math.random() - 0.5;
    var dx = 0;
    var dy = 0;
    if(speed > 0){
        dx = 4;
        dy = 4;
    }else{
        dx = -4;
        dy = -4;
    }
    circleArray.push(new Circle(x, y, dx, dy, r));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length;i++){
        circleArray[i].update();
    }
}

animate();