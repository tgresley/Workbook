//help with pattern generation from OpenAI

let gridSize = 30;
let starGridSize = 20;
let heartGridSize = 22;

let flowerPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 0, 1, 1, 1, 2, 2, 0, 0, 0],
  [0, 0, 2, 2, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0],
  [0, 0, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 1, 1, 2, 1, 1],
  [0, 0, 0, 0, 2, 1, 2, 0, 0, 1, 1, 1, 1, 1, 2],
  [0, 0, 0, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2, 1, 0],
  [0, 0, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
  [0, 0, 2, 2, 1, 1, 2, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 2, 1, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let starPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 5, 6, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 5, 6, 6, 5, 6, 0, 0, 0, 0, 0, 0],
  [5, 6, 5, 6, 6, 5, 5, 6, 5, 6, 5, 5, 6, 6, 6, 6, 5],
  [0, 5, 6, 6, 6, 6, 6, 6, 6, 5, 6, 5, 6, 6, 6, 6, 0],
  [0, 0, 6, 6, 5, 5, 6, 5, 5, 6, 6, 6, 5, 5, 5, 0, 0],
  [0, 0, 0, 6, 6, 0, 0, 5, 6, 6, 6, 5, 5, 5, 0, 0, 0],
  [0, 0, 0, 0, 6, 5, 5, 5, 6, 6, 6, 5, 6, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 6, 6, 5, 6, 6, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 5, 5, 6, 6, 5, 5, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 6, 6, 5, 6, 0, 6, 6, 6, 6, 0, 0, 0, 0],
  [0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 5, 5, 6, 0, 0, 0, 0],
  [0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0],
  [0, 0, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 0, 0],
];

let heartPattern = [
  [0, 7, 7, 8, 8, 8, 0, 8, 8, 8, 8, 0],
  [7, 8, 0, 7, 7, 8, 0, 8, 8, 7, 7, 8],
  [8, 8, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7],
  [7, 7, 7, 8, 8, 7, 7, 8, 8, 8, 7, 8],
  [7, 7, 0, 7, 7, 7, 7, 0, 0, 7, 7, 8],
  [7, 8, 8, 8, 7, 8, 7, 7, 7, 8, 8, 8],
  [0, 7, 7, 7, 7, 8, 7, 7, 8, 8, 8, 0],
  [0, 0, 8, 7, 7, 8, 8, 7, 8, 8, 0, 0],
  [0, 0, 0, 7, 0, 8, 7, 8, 8, 0, 0, 0],
  [0, 0, 0, 0, 8, 7, 8, 8, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0],
];

let cellsToDraw = [];
let offsetX, offsetY;
let starOffsetX, starOffsetY;
let heartOffsetX, heartOffsetY;
let flowerLayer;
let font;

let starBounds = [];
let heartBounds = [];

function preload() {
  font = loadFont('./wk5/HV.ttf'); // Adjust path to your font
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  flowerLayer = createGraphics(windowWidth, windowHeight);

  offsetX = width / 2 - (flowerPattern[0].length * gridSize) / 2;
  offsetY = height / 2 - (flowerPattern.length * gridSize) / 2;

  starOffsetX = width - starPattern[0].length * starGridSize - 40;
  starOffsetY = 40;

  heartOffsetX = 80;
  heartOffsetY = 190;

  for (let y = 0; y < flowerPattern.length; y++) {
    for (let x = 0; x < flowerPattern[y].length; x++) {
      if (flowerPattern[y][x] !== 0) {
        cellsToDraw.push({ x, y, type: flowerPattern[y][x], source: 'flower' });
      }
    }
  }

  for (let y = 0; y < starPattern.length; y++) {
    for (let x = 0; x < starPattern[y].length; x++) {
      if (starPattern[y][x] !== 0) {
        cellsToDraw.push({ x, y, type: starPattern[y][x], source: 'star' });
      }
    }
  }

  for (let y = 0; y < heartPattern.length; y++) {
    for (let x = 0; x < heartPattern[y].length; x++) {
      if (heartPattern[y][x] !== 0) {
        cellsToDraw.push({ x, y, type: heartPattern[y][x], source: 'heart' });
      }
    }
  }
}

function draw() {
  background(0, 0, 0, 0);

  push();
  textFont(font);
  translate(width / 2, height / 2 - 100);
  scale(1, 1.5);
  textAlign(CENTER, CENTER);
  textSize(400);
  fill(0);
  noStroke();
  text('WEEK 5', 0, 0);
  pop();


  push();
  textFont(font);
  translate(210, 490);
  scale(1, 2);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 105, 180);

  text('CODING', 0, 0);
  pop();


push();
  textFont(font);
  translate(windowWidth - 200, 400);
  scale(1, 1.5);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(0,0,255);

  text('WORKSHOP', 0, 0);
  pop();




  image(flowerLayer, 0, 0);

  checkStarHover();
  checkHeartHover();
}

function drawOneRandomShape() {
  if (cellsToDraw.length === 0) return;

  let index = floor(random(cellsToDraw.length));
  let cell = cellsToDraw.splice(index, 1)[0];

  let size, originX, originY;
  if (cell.source === 'flower') {
    size = gridSize;
    originX = offsetX;
    originY = offsetY;
  } else if (cell.source === 'star') {
    size = starGridSize;
    originX = starOffsetX;
    originY = starOffsetY;
  } else if (cell.source === 'heart') {
    size = heartGridSize;
    originX = heartOffsetX;
    originY = heartOffsetY;
  }

  let posX = originX + cell.x * size;
  let posY = originY + cell.y * size;

  flowerLayer.noStroke();

  // Red (flower)
  if (cell.type === 1 || cell.type === 2) {
    flowerLayer.fill(255, 0, 0);
    if (cell.type === 1) flowerLayer.rect(posX, posY, size, size);
    else flowerLayer.ellipse(posX + size / 2, posY + size / 2, size, size);
  }

  // Green (flower leaves)
  else if (cell.type === 3 || cell.type === 4) {
    flowerLayer.fill(0, 100, 0);
    if (cell.type === 3) flowerLayer.rect(posX, posY, size, size);
    else flowerLayer.ellipse(posX + size / 2, posY + size / 2, size, size);
  }

  // Blue (star)
  else if (cell.type === 5 || cell.type === 6) {
    flowerLayer.fill(0, 0, 255);
    if (cell.type === 5) flowerLayer.rect(posX, posY, size, size);
    else flowerLayer.ellipse(posX + size / 2, posY + size / 2, size, size);
    

    // Store star bounds for click detection
    starBounds.push({ x: posX, y: posY, size: size });
    
  }

  // Yellow (heart)
  else if (cell.type === 7 || cell.type === 8) {
    flowerLayer.fill(255, 105, 180);
    if (cell.type === 7) flowerLayer.rect(posX, posY, size, size);
    else flowerLayer.ellipse(posX + size / 2, posY + size / 2, size, size);

    // Store heart bounds for click detection
    heartBounds.push({ x: posX, y: posY, size: size });
  }
}

function checkStarHover() {
    let isHovering = false; // Track if the mouse is hovering over any star
    for (let i = 0; i < starBounds.length; i++) {
      let star = starBounds[i];
      if (mouseX > star.x && mouseX < star.x + star.size && mouseY > star.y && mouseY < star.y + star.size) {
        fill(255, 255, 0); // Change color to yellow on hover
        isHovering = true; // Set the flag to true if hovering over the star
        if (mouseIsPressed) {
          window.location.href = "./wk5workshop/index.html"; // Replace with your desired URL
        }
      } else {
        fill(0, 0, 255); // Default color (blue)
      }
      noStroke();
      ellipse(star.x + star.size / 2, star.y + star.size / 2, star.size, star.size); // Drawing the star
    }
    
    // Change cursor to pointer if hovering over a star
    if (isHovering) {
      cursor('pointer');
    } else {
      cursor('default'); // Reset cursor if not hovering over a star
    }
  }
  
  function checkHeartHover() {
    let isHovering = false; // Track if the mouse is hovering over any heart
    for (let i = 0; i < heartBounds.length; i++) {
      let heart = heartBounds[i];
      if (mouseX > heart.x && mouseX < heart.x + heart.size && mouseY > heart.y && mouseY < heart.y + heart.size) {
        fill(57,255,20); // Change color to red on hover
        isHovering = true; // Set the flag to true if hovering over the heart
        if (mouseIsPressed) {
          window.location.href = "./wk5coding/index.html"; // Replace with your desired URL
        }
      } else {
        fill(255, 105, 180); // Default color (pink)
      }
      noStroke();
      ellipse(heart.x + heart.size / 2, heart.y + heart.size / 2, heart.size, heart.size); // Drawing the heart
    }
    
    // Change cursor to pointer if hovering over a heart
    if (isHovering) {
      cursor('pointer');
    } else {
      cursor('default'); // Reset cursor if not hovering over a heart
    }
  }
  

function mouseMoved() {
    for (let i = 0; i < 4; i++) {  // Loop to generate 4 cells at a time
      drawOneRandomShape();
    }
  }