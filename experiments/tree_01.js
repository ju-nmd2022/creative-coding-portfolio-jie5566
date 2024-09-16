// I use Daniel's The Nature of Code as a base, do some variations.firstly, I change the background color. secondly, I change the presentence randomly showing in the x position.
//-----------------------------------------------------------------

let yoff = 0;
// Random seed to control randomness while drawing the tree
let seed = 5;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(222, 173, 40);
  fill(0);
  stroke(0);
  // Start the tree from the bottom of the screen
  translate(random(100, width - 100), height);
  // Move alogn through noise
  yoff += 0.005;
  randomSeed(seed);
  // Start the recursive branching!
  branch(60, 0);
}

function mousePressed() {
  // New tree starts with new noise offset and new random seed
  yoff = random(1000);
  //millis() keeps track of how long a sketch has been running in milliseconds (thousandths of a second).
  seed = millis();
}

function branch(h, xoff) {
  // thickness of the branch is mapped to its length
  let sw = map(h, 2, 100, 1, 5);
  strokeWeight(sw);
  // Draw the branch
  line(0, 0, 0, -h);
  // Move along to end
  translate(0, -h);

  // Each branch will be 2/3rds the size of the previous one
  h *= 0.7;

  // Move along through noise space
  xoff += 0.1;

  if (h > 4) {
    // Random number of branches
    let n = floor(random(1, 5));
    for (let i = 0; i < n; i++) {
      // Here the angle is controlled by perlin noise
      // This is a totally arbitrary way to do it, try others!
      let theta = map(noise(xoff + i, yoff), 0, 1, -PI / 2, PI / 2);
      if (n % 2 == 0) theta *= -1;

      push(); // Save the current state of transformation (i.e. where are we now)
      rotate(theta); // Rotate by theta
      branch(h, xoff); // Ok, now call myself to branch again
      pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    }
  }
}
