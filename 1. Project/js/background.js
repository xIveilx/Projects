var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x, y, r, speed){
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.r = r;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2 , false);
        c.strokeStyle = '#074973';
        c.stroke();
        c.fillStyle = '#08678C';
        c.fill();
    }

    this.update = function(){
        if(this.y + this.r < innerHeight){
            this.dy = -this.speed;
        }
        this.y += this.speed;
        if(this.y + this.r > innerHeight){
            circleArray = [];
        }

        this.draw();
    }
}

var circleArray = [];

function init(){
    circleArray = [];

    for (var i = 0; i < 10; i++) {
        var speed = (Math.random() * 3)+1;
        var r = 10;
        var x = Math.random() * (window.innerWidth - r * 2) + r;
        var y = 10;
        circleArray.push(new Circle(x, y, r, speed));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length;i++){
        circleArray[i].update();
    }
    
    if(circleArray.length == 0){
        init();
    }
}

init();
animate();