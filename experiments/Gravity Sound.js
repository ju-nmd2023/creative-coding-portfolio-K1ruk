let particles = [];
let gravity;
let synth;
let anchor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.5);

  // Shared anchor for all ropes
  anchor = createVector(width / 2, 100);

  // Create 6 particles attached to the shared anchor
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(anchor));
  }

  synth = new Tone.Synth({
    oscillator: { 
      type: "triangle7" 
    },
    envelope: { 
      attack: 0.01, 
      decay: 0.1, 
      sustain: 0.2, 
      release: 0.5 
    }
  }).toDestination();
}

function draw() {
  background(20);
    let ropeLength = 450;

for (let p of particles) {
    p.applyForce(gravity);

    let rope = p5.Vector.sub(anchor, p.pos);
    let distance = rope.mag();
    if (distance > ropeLength) {
        let k = 0.10;
        rope.setMag(k * (distance - ropeLength));
        p.applyForce(rope);
    }
}

  // Handle collision between circles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      handleCollision(particles[i], particles[j]);
    }
  }

  for (let p of particles) {
    p.update();
    p.display();
    p.drawRope(anchor);
  }

  // Draw anchor point
  fill(255);
  noStroke();
  ellipse(anchor.x, anchor.y, 10);
}

class Particle {
  constructor(anchor) {
    this.pos = anchor.copy().add(createVector(random(-50,50), random(0,50)));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.acc = createVector(0,0);
    this.r = 25;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Damping
    this.vel.mult(0.98);

  }

  display() {
    noStroke();
    fill(60, 130, 220);
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }
  drawRope(anchor) {
    stroke(255, 180);
    strokeWeight(2);
    line(anchor.x, anchor.y, this.pos.x, this.pos.y);
  }

}

function handleCollision(p1, p2) {
  let dir = p5.Vector.sub(p2.pos, p1.pos);
  let distBetween = dir.mag();
  let minDist = p1.r + p2.r;

  if (distBetween < minDist) {
    let overlap = (minDist - distBetween) / 2;
    dir.normalize();
    dir.mult(overlap);

    p1.pos.sub(dir);
    p2.pos.add(dir);

    let bounceRate = 1.2;
    let temp = p1.vel.copy();
    p1.vel = p2.vel.copy().mult(bounceRate);
    p2.vel = temp.mult(bounceRate);

    if (random() < 0.3) {
      let freq = map(minDist - distBetween, 0, minDist, 200, 600);
      synth.triggerAttackRelease(freq, "1");
    }
  }
}

