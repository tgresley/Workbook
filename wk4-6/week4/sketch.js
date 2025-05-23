let img1, img2, img3, img4, bg;
let button1, button2;

let leftGroupColor;
let rightGroupColor;

let video;
let maskCanvas;

function preload() {
  bg = loadImage("./wk4/background.jpg");
  img1 = loadImage("./wk4/pattern1.JPEG");
  img2 = loadImage("./wk4/pattern2.jpg");
  img3 = loadImage("./wk4/pattern3.jpg");
  img4 = loadImage("./wk4/pattern4.jpg");

  video = createCapture(VIDEO);
  video.size(400, 400);
video.hide(1);

}

function setup() {  
  //creating class to then use CSS
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.class('myCanvas');

  stroke(200);
  strokeWeight(1);
  noFill();


  maskCanvas = createGraphics(video.width, video.height);
  maskCanvas.ellipse(video.width / 2, video.height / 2, 130, 130); 

  //button1 to next page - class to use in css
  button1 = createButton("WORKSHOP");
  button1.position((3 * windowWidth) / 4 - 195, windowHeight / 6 - 45);
  button1.class('WorkshopButton');

  //button2 to next page
  button2 = createButton("CODING");
  button2.position(windowWidth / 4 - 300, (3 * windowHeight) / 6 + 100);
  button2.class('CodingButton');


  //linking buttons to new pages
  button1.mousePressed(() => {
    window.location.href = "./wk4workshop/index.html"; 
  });
  
  button2.mousePressed(() => {
    window.location.href = "./wk4coding/index.html"; 
  });

  //parameters for random colours of sqaure patterns
  leftGroupColor = color(random(255), random(255), random(255));
  rightGroupColor = color(random(255), random(255), random(255));
  
}

function draw() {
  background(bg);


  
  video.mask(maskCanvas);
  image(video, 890, 230); 


  // loading images and positioning and sizing them
  image(img1, windowWidth / 2 + 30, 220, 80, 90);
  image(img2, windowWidth / 2 + 120, 220, 80, 90);
  image(img3, windowWidth / 2 - 130, (2 * windowHeight) / 3 + 8, 100, 90);
  image(img4, windowWidth / 2 - 220, (2 * windowHeight) / 3 + 7, 80, 100);


  //left side grid 'pixels'
  noStroke();
  fill('#FD019D');
  const leftPattern = [
    createVector(windowWidth / 2 - 180, windowHeight / 3),
    createVector(100, windowHeight / 3),
    createVector(windowWidth / 2 - 80, windowHeight / 2 - 40),
    createVector(0, windowHeight / 2 - 40),
    createVector(windowWidth / 2 - 80, (5 * windowHeight) / 6 - 40),
    createVector(0, (5 * windowHeight) / 6 - 40),
    createVector(windowWidth / 2 - 180, windowHeight - 80),
    createVector(100, windowHeight - 80),
  ];

  for (let pos of leftPattern) {
    rect(pos.x, pos.y, 80, 80);
  }

  //right side grid 'pixels'
  fill(57, 255, 0);
  const rightPattern = [
    createVector(windowWidth / 2 + 100, 0),
    createVector(windowWidth / 2, windowHeight / 6 - 40),
    createVector(windowWidth / 2, windowHeight / 2 - 40),
    createVector(windowWidth / 2 + 100, (2 * windowHeight) / 3 - 80),
    createVector(windowWidth - 180, 0),
    createVector(windowWidth - 80, windowHeight / 6 - 40),
    createVector(windowWidth - 80, windowHeight / 2 - 40),
    createVector(windowWidth - 180, (2 * windowHeight) / 3 - 80),
  ];

  for (let pos of rightPattern) {
    rect(pos.x, pos.y, 80, 80);
  }


}

 
