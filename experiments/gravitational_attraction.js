class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 4);
    this.acceleration = createVector(0, 0);
    this.size = 20;
    this.mass = 2;
    this.color = color;
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  draw() {
    fill(0, random(100, 255), random(100, 255));
    ellipse(this.position.x, this.position.y, this.size);
    noStroke();
  }
}

class Attractor {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 100;
    this.mass = 50;
  }

  attract(element) {
    let force = p5.Vector.sub(this.position, element.position);
    let distance = constrain(force.mag(), 5, 25);
    force.normalize();
    let m = (G * element.mass * this.mass) / (distance * distance);
    force.mult(m);
    return force;
  }

  draw() {
    fill(0, 255, random(200, 255));
    ellipse(this.position.x, this.position.y, this.size);
  }
}

let element;
let attractor;
let G = 1;

function setup() {
  createCanvas(innerWidth, innerHeight);
  element = new Element(200, 200);
  attractor = new Attractor(400, 400);
}

function draw() {
  //   background(255, 255, 255,20);

  let force = attractor.attract(element);
  element.applyForce(force);
  element.update();
  element.draw();
  attractor.draw();
}
