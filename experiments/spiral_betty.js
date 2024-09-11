//this is a code learning from https://youtu.be/Z3PvLZYLW0U

// Image Variables
let cx, cy;
let angleInc = 0.005;
let radiusMax = 200;
let radiusInc = 0.01;

let img;
let renderer;
let graphics;

// GUI Variables
let radiusMaxSlider;
let angleIncSlider;
let imgColorPicker;
let bgColorPicker;
let fileTypeSelector;
let saveButton;

function preload() {
  img = loadImage("patt.png");
}

function setup() {
  createCanvas(600, 600);
  img.resize(width, 0);
  cx = width / 3;
  cy = height / 3;

  gui();
  updateCanvas();
}

function gui() {
  // Setting Initial Position
  let x0 = width + 10;
  let y0 = 10;

  // Radius Max Slider
  radiusMaxSlider = createSlider(0, 300, 200, 10);
  radiusMaxSlider.position(x0, y0);
  radiusMaxSlider.size(80);
  radiusMaxSlider.input(updateCanvas);
  let radiusMaxLabel = createDiv("Max Radius");
  radiusMaxLabel.position(x0 + 100, y0);

  // Angle Increment Slider
  angleIncSlider = createSlider(0.001, 0.01, 0.005, 0.001);
  angleIncSlider.position(x0, y0 + 30);
  angleIncSlider.size(80);
  angleIncSlider.input(updateCanvas);
  let angleIncLabel = createDiv("Angle Increment");
  angleIncLabel.position(x0 + 100, y0 + 30);

  // Image Color Picker
  imgColorPicker = createColorPicker(color(255, 0, 0));
  imgColorPicker.position(x0, y0 + 60);
  imgColorPicker.size(80);
  imgColorPicker.input(updateCanvas);
  let imgColorLabel = createDiv("Image Color");
  imgColorLabel.position(x0 + 100, y0 + 60);

  // Background Color Picker
  bgColorPicker = createColorPicker(color(220));
  bgColorPicker.position(x0, y0 + 90);
  bgColorPicker.size(80);
  bgColorPicker.input(updateCanvas);
  let bgColorLabel = createDiv("Background Color");
  bgColorLabel.position(x0 + 100, y0 + 90);

  // File Type Selector & Save Button
  fileTypeSelector = createSelect();
  fileTypeSelector.position(x0, y0 + 130);
  fileTypeSelector.size(80);
  fileTypeSelector.option("PNG");
  fileTypeSelector.option("JPEG");
  fileTypeSelector.option("SVG");
  fileTypeSelector.selected("JPEG");

  saveButton = createButton("Save Image");
  saveButton.position(x0 + 100, y0 + 130);
  saveButton.mousePressed(() => {
    if (fileTypeSelector.value() != "SVG") {
      saveCanvas("img", fileTypeSelector.value().toLowerCase());
    } else {
      updateCanvas();
      graphics.save("img.svg");
    }
  });
}

function updateCanvas() {
  // image(img, 0, 0);

  let fileType = fileTypeSelector.value();
  if (fileType == "SVG") {
    renderer = SVG;
  } else {
    renderer = P2D;
  }

  graphics = createGraphics(width, height, renderer);

  let radiusMax = radiusMaxSlider.value();
  let angleInc = angleIncSlider.value();
  let imgColor = imgColorPicker.value();
  let bgColor = bgColorPicker.value();

  graphics.background(bgColor);
  graphics.fill(imgColor);
  graphics.stroke(imgColor);

  let angle = 0;
  for (let r = 0; r < radiusMax; r += radiusInc) {
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    let pixelVal = img.get(x, y);
    let sw = map(brightness(pixelVal), 100, 0, 1, 5);

    graphics.strokeWeight(sw);
    graphics.ellipse(x, y, 3, 3);
    angle += angleInc;
  }

  image(graphics, 0, 0);
}
