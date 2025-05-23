//coloured, animated 'Type' text taken and tweaked from Richard Bourne on OpenProcessing https://openprocessing.org/sketch/1931473
//slightly animated 'les points' text taken and tweaked from Philip Steiner on OpenProcessing https://openprocessing.org/sketch/1024123
//flag animation text 'this is the text' taken and tweaked from cabbage63 on OpenProcessing https://openprocessing.org/sketch/1227832
//heart eqaution taken from standard OpenAi chatbot

let topHeight, bottomHeight;
let cam;
let cols = 10;
let rows = 10;

let font;
let font2;
let infcomPoints = [];
let lesPointsText = "point to text";
let infcomText = "les points";

let animatedText = "This is the Text";
let textBuffer;


let tstring = 'Type';
let twidth = 0;
let sizeArray = ['110', '110', '110', '110', '110', '110', '110', '110', '110', '110', '110', '110', ]


function preload(){
  font = loadFont('../wk5/HomeVideo.ttf'); 
  font2 = loadFont('../wk5/HV.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight * 2);

  textBuffer = createGraphics(windowWidth, 250);
  textBuffer.textFont('Helvetica');
  textBuffer.textSize(90);
  textBuffer.textAlign(LEFT, CENTER);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  topHeight = windowHeight;
  bottomHeight = windowHeight;

  // Setup Infcom points for animated Perlin noise top section
  let infcomSize = 100;
  let bounds = font2.textBounds(infcomText, 0, 0, infcomSize);
  let infcomX = width / 6 - bounds.w / 2;
  let infcomY = windowHeight / 2 + bounds.h / 2 - 300;
  infcomPoints = font2.textToPoints(infcomText, infcomX, infcomY, infcomSize, {
    sampleFactor: 0.3
  });
}

function draw() {
  clear();

  drawTopSection(0, topHeight);
  drawBottomSection(topHeight, bottomHeight);
}

  function heartEquation(x, y) {
    return pow(x * x + y * y - 1, 3) - x * x * y * y * y;
}



function drawTopSection(y, h) {
  push();
  translate(0, y);
     // Draw full cam
     image(cam, 0, 0, width, h);

  
     // Draw tiled mini-cams forming a heart
     let cellW = width / 1.4 / cols;
     let cellH = h / rows;
   
     for (let i = 1; i < cols - 1; i++) {
         for (let j = 1; j < rows - 1; j++) {
           let x = map(i, 0, cols, -1.5, 1.5);
           let y = map(j, 0, rows, -1.5, 1.5);
           y *= -1;
       
           let eq = heartEquation(x, y);
       
           if (eq < 0) {
             // check if any neighbor is outside the heart
             let edge = false;
             for (let dx = -1; dx <= 1; dx++) {
               for (let dy = -1; dy <= 1; dy++) {
                 if (dx === 0 && dy === 0) continue;
                 let nx = map(i + dx, 0, cols, -1.5, 1.5);
                 let ny = map(j + dy, 0, rows, -1.5, 1.5);
                 ny *= -1;
                 if (heartEquation(nx, ny) >= 0) {
                   edge = true;
                 }
               }
             }
       
             if (edge) {
               let px = i * cellW/1.3;
               let py = j * cellH/1.3;
               image(cam, px, py, cellW, cellH);
             }
           }
         }
       }
   
      push();
      fill (0,0,0,0)
       textSize (200);
       strokeWeight(5)
       stroke (255,0,0)
       textAlign(LEFT, CENTER);
    text('liveCode', 50, 150 );


pop();
  


  pop();
}

function drawBottomSection(y, h) {
  push();
  translate(0, y);
  fill(0, 0, 255);
  rect(0, 0, width, h);

  let fontSize = 180;
  let bounds = font.textBounds(lesPointsText, 0, 0, fontSize);
  let centerX = width / 2 - bounds.w  +300;
  let centerY = h / 2 + bounds.h / 2;

  let points = font.textToPoints(lesPointsText, centerX, centerY, fontSize, {
    sampleFactor: 0.1
  });

  let sizeMap = map(mouseX, 0, width, 4, 20);
  noStroke();
  fill(255);
  for (let p of points) {
    circle(p.x, p.y, sizeMap);
  }


  for (let i = 0; i < infcomPoints.length; i++) {
    let pt = infcomPoints[i];
    let nx = noise(i * 10.1 + frameCount * 0.05) * 10 - 5.0;
    let ny = noise(i * 10.2 + frameCount * 0.05) * 10 - 5.0;
    rect(pt.x + nx, pt.y + ny, 3);
  }

  strokeWeight(2);
	stroke(0);
  if (frameCount > 1000) noLoop();
	twidth = 0;
	for(let t = 0; t < tstring.length; t++){
		fill(t/tstring.length*255, 255, 255);
		let temp = tstring.substr(t, 1);
		let temp2 = int(sizeArray[t])
		textSize(temp2);
    text(tstring.substr(t, 1), width/3+twidth, height/2 - 200);
		twidth+=textWidth(temp);
		temp2 += int(random(-4, 4));
		sizeArray[t] = str(temp2);
	}

  textBuffer.clear();
  textBuffer.fill(255);
  textBuffer.textAlign(LEFT, CENTER);
  
  let allTextWidth = textBuffer.textWidth(animatedText);
  let baseY = textBuffer.height / 2;

  for (let i = 0; i < animatedText.length; i++) {
    let char = animatedText[i];
    let priorWidth = textBuffer.textWidth(animatedText.slice(0, i));
    let wave = (textBuffer.height / 2.5) * sin(((frameCount / 60) + i / animatedText.length) * PI);
    textBuffer.text(char, textBuffer.width / 2 - allTextWidth / 2 + priorWidth, baseY + wave);
  }

  // Change this xPos and yPos to move the buffer anywhere in the bottom section
  let xPos = width - textBuffer.width + 300; // right edge with 50px padding
  let yPos = h - textBuffer.height - 500;    // from bottom with 20px padding
  image(textBuffer, xPos, yPos);


  pop();



}
