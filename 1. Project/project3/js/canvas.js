var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

//Variables:
const mouse = {
    x: undefined,
    y: undefined
}

const touch = {
    x: undefined,
    y: undefined
}

//`#${Math.floor(Math.random()*16777215).toString(16)}`
//const colors = [
//    `#${Math.floor(Math.random()*16777215).toString(16)}`
//]

//Event listeners:
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('mouseout' || 'mouseover', event => {
    mouse.x = undefined;
    mouse.y = undefined;
})

addEventListener('touchmove', event => {
    touch.x = event.touches[0].clientX;
    touch.y = event.touches[0].clientY;
})

addEventListener('touchend', event => {
    touch.x = undefined;
    touch.y = undefined;
})

addEventListener('resize', event => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

//Utility functions:
function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//function randomColor(colors){
//    return colors[Math.floor(Math.random() * colors.length)];
//}

function distance(x1, y1, x2, y2){
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

//Rotates coordinate system for velocities:
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

//Swaps out two colliding particles x and y velocities after running through:
function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    //Prevent accidental overlap of particles:
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        //Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        //Store mass in var for better readability in collision equation:
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        //Velocity before equation:
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        //Velocity after 1d collision equation:
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        //Final velocity after rotating axis back to original location:
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        //Swap particle velocities for realistic bounce effect:
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

//Objects:
function Particle(x, y, r, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() -0.5) * 5,
        y: (Math.random() -0.5) * 5
    };
    this.r = r;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;

    this.update = particles => {
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            if(this === particles[i]){
                continue;
            }

            if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.r * 2 < 0){
                resolveCollision(this, particles[i]);
            }
        }

        //Mouse collision detection:
        if(distance(mouse.x, mouse.y, this.x, this.y) < 100 && this.opacity < 0.5
        || distance(touch.x, touch.y, this.x, this.y) < 100 && this.opacity < 0.5){
            this.opacity += 0.08;
        } else if(this.opacity> 0){
            this.opacity -= 0.02;

            this.opacity = Math.max(0, this.opacity);
        }

        //Particles movement:
        if(this.x + this.r > innerWidth || this.x - this.r < 0){
            this.velocity.x = -this.velocity.x;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0){
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = color;
        c.fill();
        c.restore();
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
    }
}

//Implementation:
let particles;

function init(){
    particles = [];

    let sugar = 15;
    let t = Math.pow(sugar * 2, 2);
    var amount = Math.floor(canvas.height * canvas.width / t / 3);

    for (let i = 0; i < amount; i++) {
        const r = sugar;
        let x = randomIntFromRange(r, canvas.width - r );
        let y = randomIntFromRange(r, canvas.height - r );
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;//randomColor(colors);

        if(i !== 0){
            for(let j = 0; j < particles.length; j++){
                if(distance(x, y, particles[j].x, particles[j].y) - r * 2 < 0){
                    x = randomIntFromRange(r, canvas.width - r );
                    y = randomIntFromRange(r, canvas.height - r );

                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, r, color));
    }
}

//Animation loop:
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });
}

init();
animate();