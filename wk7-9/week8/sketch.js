let textString = "Capacitive touch • Speculative objects • Other experiments • Inspo •";
let letters = [];
let imgs = [];
let imageLinks = [];
let imagePositions = [];
let angleOffsetText = 0;
let angleOffsetImages = 0;
let rotating = true;
let imageRadius;

function preload() {
  imgs[0] = loadImage('./wk8/potato.png'); 
  imgs[1] = loadImage('./wk8/box.png'); 
  imgs[2] = loadImage('./wk8/screem.png'); 
  imgs[3] = loadImage('./wk8/icon.png'); 

  imageLinks = [
    "./ACTIVITY1/index.html",
    "./ACTIVITY2/index.html",
    "./ACTIVITY3/index.html",
    "./inspo/index.html",
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textSize(60);
  fill(0);
  noStroke();
  angleMode(RADIANS);
  letters = textString.split('');
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // ==== CENTER "8" ====
  push();
  textSize(240);
  fill(0);
  text("8", 0, 0);
  pop();

  // ==== OUTER CIRCLE TEXT ====
  textSize(60);
  textStyle(NORMAL);
  let textRadius = min(width, height) / 2.5;
  let angleStepText = TWO_PI / letters.length;

  for (let i = 0; i < letters.length; i++) {
    let angle = angleOffsetText + i * angleStepText;
    let x = cos(angle) * textRadius;
    let y = sin(angle) * textRadius;

    push();
    translate(x, y);
    rotate(angle + HALF_PI);
    text(letters[i], 0, 0);
    pop();
  }

  // ==== INNER CIRCLE IMAGES ====
  imageRadius = textRadius * 0.65;
  let angleStepImg = TWO_PI / imgs.length;
  imagePositions = [];

  let hovering = false; // flag for cursor control

  for (let i = 0; i < imgs.length; i++) {
    let angle = angleOffsetImages + i * angleStepImg;
    let x = cos(angle) * imageRadius;
    let y = sin(angle) * imageRadius;

    imagePositions.push({ x, y, index: i });

    // Hit test
    let screenX = width / 2 + x;
    let screenY = height / 2 + y;
    let scale = 0.2;
    let w = imgs[i].width * scale;
    let h = imgs[i].height * scale;

    if (
      mouseX > screenX - w / 2 &&
      mouseX < screenX + w / 2 &&
      mouseY > screenY - h / 2 &&
      mouseY < screenY + h / 2
    ) {
      hovering = true;
    }

    push();
    translate(x, y);
    rotate(angle + HALF_PI);
    imageMode(CENTER);
    image(imgs[i], 0, 0, w, h);
    pop();
  }

  // Set cursor based on hover state
  if (hovering) {
    cursor('pointer');
  } else {
    cursor('default');
  }

  if (rotating) {
    angleOffsetText += 0.005;
    angleOffsetImages -= 0.01;
  }
}

function mousePressed() {
  rotating = !rotating;

  // Click detection on images
  for (let pos of imagePositions) {
    let scale = 0.2;
    let w = imgs[pos.index].width * scale;
    let h = imgs[pos.index].height * scale;
    let dx = mouseX - (width / 2 + pos.x);
    let dy = mouseY - (height / 2 + pos.y);

    if (abs(dx) < w / 2 && abs(dy) < h / 2) {
      window.open(imageLinks[pos.index], "_blank");
      break;
    }
  }
}
