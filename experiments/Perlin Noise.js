let from, to;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  frameRate(70);

  // choose two colors to blend between
  from = color(random(255), random(255), random(255));   // blue
  to   = color(random(255), random(255), random(255));   // red
}

const size = 30;
let divider = 15; 
const numRows = windowHeight / size;
const numCols = windowWidth / size;
let counter = 0;

function draw() {
  stroke(1);
  background(10);
  rectMode(CENTER);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {

      const angle = noise(x / divider, y / divider, counter) * TWO_PI;
      let amt = map(y * size, 0, height, 0, 1);
      let col = lerpColor(from, to, amt);
      fill(col);

      push();
      translate(size / 2 + x * size, size / 2 + y * size);
      rotate(angle);
      rect(0, 0, size, size);
      pop();
    }
  }
  counter += 0.01;
}
