let cols = 12;
let rows = 22;
let squareSize = 30;
let randomStep = 1;
let rand = 0;
let randomValue;
let dampen = 0.1;
let marginX = 75;
let marginY = 25;

function setup()
{
    createCanvas(innerWidth, innerHeight);
    background(25);
    noFill();
    stroke(220);
    rectMode(CENTER);    
    noLoop();
    const gridWidth = cols * squareSize;
    const gridHeight = rows * squareSize;
    marginX = (width - gridWidth) / 2;
    marginY = (height - gridHeight) / 2;
}

function draw(){
    for(let y = 1; y<=rows; y++){
        rand += (y*randomStep);
        for(let x = 1; x<=cols; x++){
            push();
            randomValue = random(-rand, rand);
            translate(marginX + (x * squareSize) + (randomValue * dampen), marginY + (y * squareSize) + (randomValue*dampen));
            rotate(radians(randomValue));        
            rect(0, 0, squareSize, squareSize,2);
            pop();
        }
    }
}
