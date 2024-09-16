//this is the variation from tree_01.js, I chose to make the showcase more random, looking organic and relaxing.

let yoff = 0;
let seed = 5;
let treeCount;

function setup() {
  createCanvas(800, 400);
  treeCount = floor(random(1, 5));
}

function draw() {
  background(random(180, 230), random(170, 220), random(40, 120));
  fill(0);
  stroke(0);

  yoff += 0.005;
  randomSeed(seed);

  // Calculate spacing based on the number of trees
  //the solution comes from chatgpt
  let spacing = width / (treeCount + 1);

  // Loop to draw each tree
  for (let i = 0; i < treeCount; i++) {
    let treeHeight = random(30, 120);
    let xPosition = spacing * (i + 1); // Spread trees out evenly across the canvas, so they don't overlap
    drawTree(xPosition, height, treeHeight);
  }
}

function mousePressed() {
  yoff = random(1000);
  seed = millis();
  treeCount = floor(random(1, 5));
}

function drawTree(x, y, h) {
  push();
  translate(x, y);
  branch(h, 0);
  pop();
}
//chatGPT explain for me of this code
function branch(h, xoff) {
  let sw = map(h, 2, 100, 1, 5); // Set stroke weight based on branch height
  strokeWeight(sw);
  line(0, 0, 0, -h);

  translate(0, -h); // Move to the end of the branch

  h *= 0.7;
  xoff += random(0.1, 0.5); // Move through Perlin noise space

  if (h > 4) {
    let n = floor(random(1, 5)); // Random number of branches
    for (let i = 0; i < n; i++) {
      let theta = map(noise(xoff + i, yoff), 0, 1, -PI / 2, PI / 2);
      if (n % 2 == 0) theta *= -1; // Flip direction randomly for even n

      push();
      rotate(theta); // Rotate branch by the calculated angle
      branch(h, xoff); // Recursively branch
      pop();
    }
  }
}
