// Ambient sound setup using Tone.js, the sound part code is suggested by chatGPT, I made some changes to create the ethereal feeling.
let synth, loop;

function setup() {
  createCanvas(800, 400);
  pixelDensity(1);
  frameRate(13);

  // Initialize the ambient synth
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine", //soft tone
    },
    envelope: {
      attack: 4,
      decay: 1,
      sustain: 0.3,
      release: 6,
    },
  }).toDestination();

  // Add some effects for a smoother sound
  const reverb = new Tone.Reverb(6).toDestination();
  const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  synth.connect(reverb);
  synth.connect(delay);

  // Create a loop that will play ambient chords
  loop = new Tone.Loop((time) => {
    let chordProgression = [
      ["C4", "E4", "G4"],
      ["A3", "E4", "A4"],
      ["F4", "A4", "C5"],
      ["G3", "B3", "D4"],
    ];
    let index = floor((frameCount / 50) % chordProgression.length); // Change chords gradually
    synth.triggerAttackRelease(chordProgression[index], "4n", time);
  }, "4n").start(0);

  Tone.Transport.start();
}

function draw() {
  let sunRadius = width / 2;
  let sunX = width / 2 - sunRadius * cos((PI * (frameCount % 200)) / 200); // X position
  let sunY = height + 50 - sunRadius * sin((PI * (frameCount % 200)) / 200); // Y position

  // Calculate brightness: stays bright when the sun is high and darkens as the sun gets low
  let brightness = map(sunY, height - sunRadius, height, 255, 120); // Bright when sun is high, darker as it gets low
  brightness = constrain(brightness, 120, 255); // Set a lower limit to avoid being too dark

  background(brightness, brightness * 0.875, brightness * 0.775, 80); // Adjust background color

  drawSun(sunX, sunY);
  noiseSeed(2); // Keep the mountains consistent
  drawMountains();

  // Adjust bird count based on brightness
  let birdCount;
  if (brightness > 150) {
    birdCount = random(0, 8); // More birds when bright
  } else {
    birdCount = random(1, 3); // Fewer birds when dark
  }

  // Only draw birds if the sun is above the mountains
  if (sunY < height - 50) {
    const originalY = 200;
    const divider = 10;

    for (let i = 0; i < birdCount; i++) {
      let x = random(width);
      const y = originalY + noise(x / divider) * 100 + random(-100, 50);
      const size = random(10, 20);
      drawSimpleBird(x, y, size);
    }
  }
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

  let leftWingStart = PI + random(QUARTER_PI / 2, QUARTER_PI);
  let leftWingEnd = TWO_PI + random(-QUARTER_PI / 2, QUARTER_PI / 2);

  let rightWingStart = PI + random(-QUARTER_PI / 2, QUARTER_PI / 2);
  let rightWingEnd =
    PI + HALF_PI + QUARTER_PI + random(-QUARTER_PI / 2, QUARTER_PI / 2);

  arc(x - size / 2, y, size, size, leftWingStart, leftWingEnd);
  arc(x + size / 2, y, size, size, rightWingStart, rightWingEnd);
}

function drawSun(sunX, sunY) {
  let sunSize = 60;
  fill(150, 57, 57, 255);
  noStroke();
  ellipse(sunX, sunY, sunSize, sunSize);
}

// Start the sound when you click anywhere on the canvas
function mousePressed() {
  if (Tone.context.state !== "running") {
    Tone.context.resume();
  }
}
