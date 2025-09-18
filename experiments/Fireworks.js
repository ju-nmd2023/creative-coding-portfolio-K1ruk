class Particle {
  constructor(x, y, hu, firework = false) {
    this.position = createVector(x, y);
    this.lifespan = 125;
    this.hu = hu;
    this.firework = firework;

    if (this.firework) {

      this.velocity = createVector(0, random(-17, -10));
    } else {
        const angle = random(TWO_PI);
        const speed = random(8, 20); 
        this.velocity = p5.Vector.fromAngle(angle).mult(speed);
    }

    this.acc = createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.velocity.mult(0.9);
      this.lifespan -= 4;
    }
    this.velocity.add(this.acc);
    this.position.add(this.velocity);
    this.acc.mult(0);
  }

  done() {
    return this.lifespan < 0;
  }

  show() {
    colorMode(HSB);

    if (this.firework) {
      strokeWeight(4);
      stroke(0, 0, 255); 
    } else {

      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan);
    }

    point(this.position.x, this.position.y);
  }
}

class Firework {
  constructor() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.velocity.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    for (let i = 0; i < 150; i++) {
      const p = new Particle(this.firework.position.x, this.firework.position.y, this.hu);
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let p of this.particles) {
      p.show();
    }
  }
}

let fireworks = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
  frameRate(30);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);

  if (random(1) < 0.03) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
