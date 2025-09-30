class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }
  
  draw() {
    push();
    let amt = map(this.position.y, 0, innerHeight, 0, 1);
    let col = lerpColor(from, to, amt);

    stroke(col);
    strokeWeight(0.2);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
    pop();
}
}

let from, to;
let fieldSize = 50;
let maxCols, maxRows;
let divider;
let field;
let agents = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  colorMode(RGB);

  maxCols = Math.ceil(innerWidth / fieldSize);
  maxRows = Math.ceil(innerHeight / fieldSize);
  divider = random(2, 10);

  from = color(random(255), random(255), random(255));
  to = color(random(255), random(255), random(255));

  field = generateField();
  generateAgents();

  frameRate(15);
}

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 200; i++) {
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      4,
      0.1
    );
    agents.push(agent);
  }
}

function draw() {
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);

    // Safety check in case x or y is out of bounds
    if (field[x] && field[x][y]) {
      const desiredDirection = field[x][y];
      agent.follow(desiredDirection);
    }

    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}
function mouseClicked(){
  saveCanvas('downloads', 'png');
}

