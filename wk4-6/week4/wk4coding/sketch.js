function setup() {
  createCanvas(windowWidth, windowHeight * 2);
  background(255);

  // Draw polka dots
  let spacing = 90; // distance between dots
  let dotSize = 30; // dot size

  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      let offset = (y / spacing) % 2 === 0 ? 0 : spacing / 2;
      fill(255);
      stroke(0);
      strokeWeight(0.8);
      ellipse(x + offset, y, dotSize, dotSize);
    }
  }

  // Draw stretched star shape
  fill('#BDF6FE'); // Pink star
  noStroke();
  let starWidth = (28 * windowWidth) / 60; // Half of 28/30
  let starHeight = windowHeight/2;      // Very flat
  drawStretchedStar(windowWidth / 2, height / 2 + 500, starWidth, starHeight);
}

function draw() {
  // Background gray rectangle
  fill(180, 180, 180);
  noStroke();
  rect(windowWidth / 30, windowHeight / 6, (28 * windowWidth) / 30, 50);

  // Pink ellipse background shape
  fill('#FADADD');
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2 + 100, (28 * windowWidth) / 30, 500);
}

// Function for a stretched five-point star
function drawStretchedStar(x, y, widthStretch, heightStretch) {
  beginShape();
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2.0;

  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    // Outer point
    let sx = x + cos(a) * widthStretch;
    let sy = y + sin(a) * heightStretch;
    vertex(sx, sy);

    // Inner point
    sx = x + cos(a + halfAngle) * (widthStretch * 0.4);
    sy = y + sin(a + halfAngle) * (heightStretch * 0.4);
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
