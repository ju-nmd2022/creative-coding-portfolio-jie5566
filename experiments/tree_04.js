let yoff = 0;
let seed = 5;
let growth = 0;
let maxGrowth = 100;

let synth, growSoundLoop;
let hasStoppedGrowing = false;

function setup() {
  createCanvas(800, 400);

  // Initialize the ambient grow sound synth
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 2,
      decay: 1,
      sustain: 0.5,
      release: 3,
    },
  }).toDestination();

  // Add effects to enrich the sound
  const reverb = new Tone.Reverb(4).toDestination();
  const delay = new Tone.FeedbackDelay("8n", 0.4).toDestination();
  synth.connect(reverb);
  synth.connect(delay);

  // Loop to trigger growing sound effect that corresponds with growth
  growSoundLoop = new Tone.Loop((time) => {
    if (growth < maxGrowth) {
      let notes = ["C4", "D4", "E4", "G4", "A4"];
      let index = floor(map(growth, 0, maxGrowth, 0, notes.length - 1)); // Map growth to the range of notes
      synth.triggerAttackRelease(notes[index], "8n", time); // Play a short note corresponding to the growth
    }
  }, "4n").start(0); // Play at a regular interval

  Tone.Transport.start();
}

function draw() {
  background(111, 148, 96);
  fill(0);
  stroke(0);
  translate(width / 2, height);
  yoff += 0.005;
  randomSeed(seed);

  if (growth < maxGrowth) {
    growth += 0.1; // Slowly increase growth
  } else if (!hasStoppedGrowing) {
    hasStoppedGrowing = true;
    stopMusic(); // Call this function once when growth stops
  }

  branch(growth, 0);
}

function mousePressed() {
  yoff = random(1000);
  seed = millis();
  growth = 0;
  hasStoppedGrowing = false; // Reset the growing state
  growSoundLoop.start(0); // Restart the grow sound loop if growth resets
  if (Tone.context.state !== "running") {
    Tone.context.resume();
  }
}

function branch(h, xoff) {
  let sw = map(h, 2, maxGrowth, 1, 5); // Thickness of the branch is based on current height
  strokeWeight(sw);

  line(0, 0, 0, -h);
  translate(0, -h); // Move to the end of the branch

  h *= 0.7; // Reduce the branch length for the next recursion

  xoff += 0.1; // Move along noise space

  if (h > 4) {
    let n = floor(random(1, 5)); // Random number of branches
    for (let i = 0; i < n; i++) {
      let theta = map(noise(xoff + i, yoff), 0, 1, -PI / 2, PI / 2); // Randomized angle using noise
      if (n % 2 == 0) theta *= -1;

      push(); // Save the current transformation state
      rotate(theta); // Rotate the branch by angle theta
      branch(h, xoff); // Recursively call the branch function
      pop(); // Restore the previous state
    }
  }
}

// Function to stop the music when growth stops
function stopMusic() {
  growSoundLoop.stop(); // Stop the grow sound loop
  synth.releaseAll(); // Stop all currently playing notes immediately
}
