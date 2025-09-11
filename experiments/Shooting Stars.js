let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);
}

function draw() {
  // Slightly transparent background for trail effect
  fill(0, 20);
  rect(0, 0, width, height);

  // Occasionally add a new shooting star
  if (random(1) < 0.05) {
    stars.push(new ShootingStar());
  }

  // Update and display stars
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    stars[i].show();

    // Remove stars that are off screen
    if (stars[i].offscreen()) {
      stars.splice(i, 1);
    }
  }
}

class ShootingStar {
  constructor() {
    // Start from a random position near top or middle
    this.x = random(width);
    this.y = random(height / 2);
    this.len = random(30, 80);
    this.speed = random(4, 8);
    this.alpha = 255;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
    this.alpha -= 4;
  }

  show() {
    for (let i = 0; i < this.len; i++) {
      let alpha = map(i, 0, this.len, this.alpha, 0);
      fill(100, alpha);
      ellipse(this.x - i, this.y - i, 2);
    }
  }

  offscreen() {
    return (this.x > width || this.y > height || this.alpha <= 0);
  }
}
