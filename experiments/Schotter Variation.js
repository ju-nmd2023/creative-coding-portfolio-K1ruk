let cols = windowWidth/10;
let rows = windowHeight/22;
let squareSize = 20;
let randomStep = 1;
let rand = 0;
let randomValue;
let dampen = 0.1;
let marginX = 75;
let marginY = 25;
let fillValue = 25;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(25);
    noStroke();
    rectMode(CENTER);    
    noLoop();
}

function draw(){
    for(let y = 1; y<=rows; y++){
        fill(fillValue);
        rand += (y*randomStep);
        for(let x = 1; x<=cols; x++){
            push();
            fillValue++;
            randomValue = random(-rand, rand);
            translate((y * squareSize) + (randomValue * dampen), (x * squareSize) + (randomValue*dampen));
            rotate(radians(randomValue));        
            rect(0, 0, squareSize, squareSize,2);
            pop();
        }
    }
}
