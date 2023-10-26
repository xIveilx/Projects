var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
console.log(canvas);

var mouse = {
    x: undefined,
    y: undefined
}

var touch = {
    x: undefined,
    y: undefined
}

var maxRadius = 60;
//var minRadius = 3;

var colorArray = [
    '#FC8DCA',
    '#C37EDB',
    '#B7A6F6',
    '#88A3E2',
    '#AAECFC'
];


function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

window.addEventListener('mousemove', function(event) {
    if (!isMobile()) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
});

window.addEventListener('touchmove', function(event) {
    if (isMobile()) {
        touch.x = event.touches[0].clientX;
        touch.y = event.touches[0].clientY;
    }
});

window.addEventListener('mouseout', function(event) {
    if (!isMobile()) {
        mouse.x = undefined;
        mouse.y = undefined;
    }
});

window.addEventListener('touchend', function(event) {
    if (isMobile()) {
        touch.x = undefined;
        touch.y = undefined;
    }
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = r;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2 , false);
        //c.strokeStyle = 'red';
        //c.stroke();
        c.fillStyle = this.color;
        c.fill();
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

        //interaktivitás
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
        && mouse.y - this.y < 50 && mouse.y - this.y > -50
        || touch.x - this.x < 50 && touch.x - this.x > -50 
        && touch.y - this.y < 50 && touch.y - this.y > -50){
            if(this.r < maxRadius){
            this.r += 3;
            }
        }else if(this.r > this.minRadius){
            this.r -= 3;
        }

        this.draw();
    }
}

var circleArray = [];

function init(){
    circleArray = [];

    for (var i = 0; i < 1500; i++) {
        var r = Math.random() * 6 + 4;
        var x = Math.random() * (window.innerWidth - r * 2) + r;
        var y = Math.random() * (window.innerHeight - r * 2) + r;
        //var speed = Math.random() - 0.6;
        var dx = Math.random() - 0.6;
        var dy = Math.random() - 0.6;
        //if(speed > 0){
        //    dx = 1;
        //    dy = 1;
        //}else{
        //    dx = -1;
        //    dy = -1;
        //}
        circleArray.push(new Circle(x, y, dx, dy, r));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length;i++){
        circleArray[i].update();
    }
}

init();
animate();