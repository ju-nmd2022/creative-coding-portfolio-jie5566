// this is a varation from The Nature of Code's Oscillator Objects, https://editor.p5js.org/natureofcode/sketches/b3HpgJa6F

let oscillators = [];

function setup() {
  createCanvas(800, 600);
  // Initialize all objects
  for (let i = 0; i < 30; i++) {
    oscillators.push(new Oscillator());
  }
}

function draw() {
  background(255);
  // Run all objects
  for (let i = 0; i < oscillators.length; i++) {
    oscillators[i].update();
    oscillators[i].show();
  }
}

class Oscillator {
  constructor() {
    this.angle = createVector();
    this.angleVelocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(
      random(20, width / 2),
      random(20, height / 5)
    );
  }

  update() {
    this.angle.add(this.angleVelocity);
  }

  show() {
    let x = sin(this.angle.x) * this.amplitude.x;
    let y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width / 2, height / 2);
    stroke(0, 0, random(100, 255));
    strokeWeight(0.5);
    fill(50, 50, random(100, 255));
    line(0, 0, x, y);
    circle(x, y, 30);
    pop();
  }
}
