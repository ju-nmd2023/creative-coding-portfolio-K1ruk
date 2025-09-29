let cols = 50;
let rows = 0;
let squareSize = 15;
let randomStep = 1;
let rand = 0;
let randomValue;
let dampen = 0.1;
let gridWidth, gridHeight;
let marginX, marginY;
let slider;

function setup() {
    slider = createSlider(1, 50, 1, 5);
    slider.position(200, 100);
    slider.size(80);

    createCanvas(windowWidth, windowHeight);
    background(25);
    noFill();
    stroke(220);
    rectMode(CENTER);  
    noLoop();

    gridWidth = cols * squareSize;
    gridHeight = rows * squareSize;

    // Center the grid in the middle of the canvas
    marginX = width / 2 - gridWidth / 2;
    marginY = height / 2 - gridHeight / 2;
}

function draw() {
    rows = slider.value();
    rand = 0;
    squareSize += 2;
    for (let y = 0; y < rows; y++) {
        
        rand += y * randomStep;

        for (let x = 0; x < cols; x++) {
            push();

            randomValue = random(-rand, rand);

            let px = marginX + x * squareSize + (randomValue * dampen);
            let py = marginY + y * squareSize + (randomValue * dampen);

            translate(px, py);
            rotate(radians(randomValue));
            rect(0, 0, squareSize, squareSize, 2);

            pop();
        }
        
    }
}
