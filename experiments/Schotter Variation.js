let cols = 50;
let rows = 0;
let squareSize = 15;
let randomStep = 1;
let rand = 0;
let randomValue;
let dampen = 0.1;
let gridWidth, gridHeight;
let marginX, marginY;
let rowSlider, colSlider;
let pRow, pCol;

function setup() {
    pRow = createP("Drag to change <br> number of rows")
    pRow.position(200,70);
    pRow.style("color:whitesmoke;");

    rowSlider = createSlider(1, 30, 1, 3);
    rowSlider.position(200, 150);
    rowSlider.size(80);
    rowSlider.input(() => redraw());
    rowSlider.style("height:3px; cursor:pointer;");

    pCol = createP("Drag to change <br> number of columns")
    pCol.position(200,220);
    pCol.style("color:whitesmoke;");

    colSlider = createSlider(1, 30, 1, 3);
    colSlider.position(200, 300);
    colSlider.size(80);
    colSlider.input(() => redraw());
    colSlider.style("height:3px; cursor:pointer;");

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
    marginY = height / 6 - gridHeight / 2;
}

function draw() {
    background(25);
    rows = rowSlider.value();
    cols = colSlider.value();
    rand = 0;
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
