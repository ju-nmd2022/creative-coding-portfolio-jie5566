// 2024-08-29 Creative coding
//It is inspired from perlin noises, I used it for the birds and the mountains,
//This is a Asian mountain landscape in water color style, I would like to create a peaceful feeling.
// Future possible steps might be adding peaceful music; let the bird fly;
// So far, there is something wrong with the text, it doesn't show on the canvas
//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function setup() {
  createCanvas(800, 400);
  pixelDensity(1);
  noLoop();
}

function draw() {
  background(200, 175, 155);
  drawSun();
  drawMountains();

  const birdCount = random(8, 16);
  const originalY = 200;
  const divider = 10;

  for (let i = 0; i < birdCount; i++) {
    let x = random(width);
    const y = originalY + noise(x / divider) * 100 + random(-100, 50);
    const size = random(10, 20);
    drawSimpleBird(x, y, size);
  }

  drawWatercolorPaperEffect();
  // drawText("Hello", width / 2, height - 50);
}

function drawMountains() {
  noStroke();

  // Mountain color palette from background to foreground
  let colors = [
    color(206, 218, 217), // Farthest mountain (lightest)
    color(158, 181, 179),
    color(171, 189, 177),
    color(141, 163, 153),
    color(109, 130, 123), // Foreground mountain (darkest)
  ];

  // Draw each layer of mountains
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    beginShape();
    let yOffset = i * 2 + 120; // Slightly lower each layer
    vertex(0, height); // Start from the bottom-left corner
    for (let x = 0; x <= width; x += 20) {
      let y = height / 2 + noise(x * 0.01, i * 300) * 300 - yOffset;
      vertex(x, y);
    }
    vertex(width + 300, height); // End at the bottom-right corner
    endShape(CLOSE);
  }
}

function drawSimpleBird(x, y, size) {
  stroke(0);
  strokeWeight(1.5);
  noFill();

  // Randomize the wing curvature slightly, the solution is from chatGPT
  let leftWingStart = PI + random(QUARTER_PI / 2, QUARTER_PI);
  let leftWingEnd = TWO_PI + random(-QUARTER_PI / 2, QUARTER_PI / 2);

  let rightWingStart = PI + random(-QUARTER_PI / 2, QUARTER_PI / 2);
  let rightWingEnd =
    PI + HALF_PI + QUARTER_PI + random(-QUARTER_PI / 2, QUARTER_PI / 2);

  // Draw the bird as a simple "V" shape using two arcs
  arc(x - size / 2, y, size, size, leftWingStart, leftWingEnd);
  arc(x + size / 2, y, size, size, rightWingStart, rightWingEnd);
}

function drawSun() {
  let sunX = random(250, 500);
  let sunY = random(80, 180);
  let sunSize = random(60, 100);

  fill(150, 57, 57);
  noStroke();
  ellipse(sunX, sunY, sunSize, sunSize);
}

// watercolor layer solution is from chatGPT
function drawWatercolorPaperEffect() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let noiseValue = noise(x * 0.05, y * 0.05) * 20;
      pixels[index + 0] += noiseValue; // Red
      pixels[index + 1] += noiseValue; // Green
      pixels[index + 2] += noiseValue; // Blue
    }
  }
  updatePixels();
}

// function drawText(message, x, y) {
//   fill(0); // Text color
//   textSize(32); // Text size
//   textAlign(CENTER, CENTER); // Center the text
//   textFont("Arial"); // You can change the font
//   text(message, x, y); // Draw the text at the specified position
// }
