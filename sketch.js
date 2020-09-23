const config = { 
    canvasSize: {
        x: 500,
        y: 500,
    },
    background: 0,
}

const randomValue = (maxSize, minSize) =>  Math.floor(Math.random() * maxSize + (minSize | 0));


////////////////////////////////////////////////////////////////////////

class Snow{

    constructor(){

        this.x = randomValue(config.canvasSize.x);
        this.y = randomValue(config.canvasSize.y) - config.canvasSize.x;
        this.size = randomValue(5, 4);


        this.gravity = 0.9;
        this.speed = this.size * this.gravity;
        this.wind = this.size * 0.2;
        
    }

    updateWind(windForce, gravity){
        this.wind = windForce;
        this.gravity = gravity;
        
    }

    blow(){
        this.x += this.wind;
    }

    fall(){
        this.y += this.speed * this.gravity;
    }

    respawnY(){
        this.y = randomValue(config.canvasSize.y) - config.canvasSize.x;
    }

    respawnX(){
        this.x = 0;
    }

    render(){
        
        if(this.y > config.canvasSize.y) this.respawnY();
        if(this.x > config.canvasSize.x) this.respawnX();

        ellipse(this.x, this.y, this.size);
        noStroke();
    }

}

const snowFlakes = new Array(100).fill().map(x => new Snow())

function mouseMoved(e){
    const force = map(e.offsetX, 0, 15, 1, 1.1);
    const gravity = map(e.offsetY, 0, 300, 0.5, 0.9);

    for(flake of snowFlakes){
        flake.updateWind(force, gravity)
    }
}

function setup(){
    createCanvas(config.canvasSize.x,config.canvasSize.y);
}

function draw(){
    
    background(config.background);

    for(flake of snowFlakes){
        flake.render();
        flake.fall();
        flake.blow();
    }

}

