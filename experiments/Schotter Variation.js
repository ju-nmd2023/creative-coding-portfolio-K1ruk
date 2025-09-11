let cols = 120;
let rows = 30;
let squareSize = 5;
let randomStep = 1;
let rand = 0;
let randomValue;
let dampen = 0.1;
let marginX = 75;
let marginY = 25;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(25);
    noFill();
    stroke(220);
    rectMode(CENTER);  
    noLoop();
}

function draw(){
    for(let y = 1; y<=rows; y++){
        squareSize += 1;
        rand += (y*randomStep);
        for(let x = 1; x<=cols; x++){
            push();
            randomValue = random(-rand, rand);
            translate((x * squareSize) + (randomValue * dampen),(y * squareSize) + (randomValue*dampen));
            rotate(radians(randomValue));
                    
            rect(0, 0, squareSize, squareSize,2);
            pop();
        }
    }
}
