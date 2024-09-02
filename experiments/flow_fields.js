let cols, rows;
let scl = 10;
let zoff = 0;
let flowfield;
let particles = [];
let radius;

function setup() {
  createCanvas(800, 800);
  radius = min(width / 2, height) / 2;
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }

  noiseDetail(8, 0.13);
  background(255);
}

function draw() {
  let yoff = 0;
  translate(width / 2, height / 2);
  for (let y = -rows / 2; y < rows / 2; y++) {
    let xoff = 0;
    for (let x = -cols / 2; x < cols / 2; x++) {
      let index = x + cols / 2 + (y + rows / 2) * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.003;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield, cols, rows, scl);
    particles[i].update();
    particles[i].edges(radius);
    particles[i].show(radius);
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(-radius, radius), random(-radius, radius));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
  }

  follow(vectors, cols, rows, scl) {
    let x = floor((this.pos.x + width / 2) / scl);
    let y = floor((this.pos.y + height / 2) / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges(r) {
    if (this.pos.mag() > r) {
      this.pos = p5.Vector.random2D().mult(r); // Reposition to a random point on the circle
      this.vel.set(0, 0);
    }
  }

  show(r) {
    if (this.pos.mag() < r) {
      stroke(0, 50);
      strokeWeight(1);
      point(this.pos.x, this.pos.y);
    }
  }
}
