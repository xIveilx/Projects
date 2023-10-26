var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

var hatarx = 100;
var hatary = 1.01;
//körök mennyisége:
var korok = window.innerWidth /25;

function Circle(x, y, r, speed, id){
    this.id = id;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.r = r;

    this.draw = function(){
        //c.beginPath();
        //c.arc(this.x, this.y, this.r, 0, Math.PI * 2 , false);
        //c.strokeStyle = '#074973';
        //c.stroke();
        //c.fillStyle = '#08678C';
        //c.fill();
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI / 2 , false);
        c.arc(this.x, this.y + this.r * 2, this.r, Math.PI * 1.5,  0, false);
        c.arc(this.x + this.r * 2, this.y + this.r * 2, this.r, Math.PI ,  Math.PI * 1.5, false);
        c.arc(this.x + this.r * 2, this.y, this.r, Math.PI / 2,  Math.PI, false);
        c.strokeStyle = '#074973';
        c.stroke();
        c.fillStyle = '#074973';
        c.fill();
        //c.beginPath();
        //c.translate(this.x + this.r, this.y + this.r);
        //c.lineTo(-100,-100);
        //c.strokeStyle = '#074973';
        //c.stroke();
    }

    this.update = function(){
        //iránya:
        this.x += this.speed;
        this.y += this.speed * 0.23;
        //reset:
        if(this.y + this.r > innerHeight || this.x + this.r > innerWidth){
            this.x = 0;//Math.random() * (window.innerWidth * 2) / hatarx;
            this.y = Math.random() * (window.innerHeight * 2) -600;
        }

        this.draw();
    }
}
//Egy tömb amiben a körök vannak:
var circleArray = [];
//körök idja:
var id = 0;

function init(){
        //adatok
        var speed = (Math.random() * 8)+4;
        var r = 10;
        var x = Math.random() * (window.innerWidth - r * 2) + r;
        var y = Math.random() * (window.innerHeight - r * 2) + r;
        circleArray.push(new Circle(x, y, r, speed, id));
        console.log(id);
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    
    for(var i = 0; i < circleArray.length;i++){
        circleArray[i].update();
    }
    
    if(circleArray.length == 0){
        circleArray = [];
        for (var i = 0; i < korok; i++) {
        id = i;
        init();
        }
    }
}

animate();