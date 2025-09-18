let from, to;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  frameRate(120);

  from = color(random(255),random(255),random(255)); 
  to   = color(random(255),random(255),random(255));
}

const size = 40;
let divider = 15; 
const numRows = innerHeight / size;
const numCols = innerWidth / size;
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
      rect(0, 0, size, size, 5);
      pop();
    }
  }
  counter += 0.01;
}
