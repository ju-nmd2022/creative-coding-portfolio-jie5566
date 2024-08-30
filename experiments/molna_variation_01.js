// function setup() {
//   createCanvas(600, 600);
//   frameRate(10);
// }
// const size = 10;
// const divider = 30;
// const numRows = 60;
// const numCols = 60;

// let counter = 0;

// function draw() {
//   background(255);
//   noStroke();
//   // fill(0);

//   for (let y = 0; y < numRows; y++) {
//     for (let x = 0; x < numCols; x++) {
//       const value = noise(x / divider, y / divider, counter) * size;
//       ellipse(size / 2 + x * size, size / 2 + y * size, value);
//       fill(value * 30, 255, 255 - value * 60);
//     }
//   }

//   counter += 0.1;
// }

function setup() {
  createCanvas(600, 600);
  frameRate(10);
}
const size = 10;
const numRows = 60;
const numCols = 60;

let counter = 0;

function draw() {
  background(0);
  noStroke();

  // Map mouseX position to a range that affects the noise divider
  const divider = map(mouseX, 0, width, 10, 100);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      fill(value * 20, 250, 255 - value * 20);

      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }

  counter += 0.1;
}
