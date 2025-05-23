//'Grindophone' sound generation taken and tweaked from Richard Bourne on OpenProcessing https://openprocessing.org/sketch/1188498

//debugging done with help of standard OpenAI chatbot


let attackLevel = 0.1;
let releaseLevel = 0;

let attackTime = 0.001;
let decayTime = 0.01;
let susPercent = 0.5;
let releaseTime = 0.05;

let env, triOsc, root, frequency, recordTouch = [];
let playNotes = 0;
let fr = 15;
let delayTime = 0.07;
let feedBack = 0.2;
let filterFreq = 2300;
let delay;

let showMessage = false;
let clickedOnce = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Times New Roman');

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  triOsc = new p5.Oscillator('sine');
  triOsc.amp(env);
  triOsc.start();
  triOsc.freq(0); // silence initially

  root = 440;
  frequency = 220;

  delay = new p5.Delay();
}

function mousePressed() {
  userStartAudio(); // Required for sound in modern browsers
  showMessage = true; // Enable text reveal
  clickedOnce = true;   
}

function draw() {


 

  frameRate(fr);
  delay.process(triOsc, delayTime, feedBack, filterFreq);
  triOsc.freq(frequency);

  let spacing = 10;
  for (let i = 0; i < recordTouch.length; i++) {
    let f = recordTouch[i];
    let x = i * spacing + 20;
    if (x + 10 < width) {
      fill(255 - f / 10, 50 + f / 10, 150 - f / 20);
      stroke(255 - f / 10, 50 + f / 10, 150 - f / 20);
      rect(x, (height / 2) - f / 5, 10, 20);
    }
  }

  if (playNotes > 0 && playNotes < recordTouch.length) {
    let f = recordTouch[playNotes];
    let x = playNotes * spacing + 20;
    if (x + 10 < width) {
      frequency = f;
      env.play();
      fill(255, 30, 30);
      stroke(255, 30, 30);
      rect(x, (height / 2) - f / 5, 30, 30);
      playNotes++;
    } else {
      playNotes = 0; // stop playing if off-screen
    }
  }

  if (getAudioContext().state !== 'running' && !clickedOnce)  {
    fill(64, 42, 50);
    textAlign(CENTER, CENTER);
    textSize(30);
    text('Click Anywhere.',600, 200);
  }

  if (showMessage) {
    noStroke ();
    fill(64, 42, 50);
    textSize(28);
    textAlign(LEFT, CENTER);
    text("Type Anything.\nThe lyrics of your favourite song?\n I dont care.\n then Press 1.", 40 , height - 90);
  }

  


}

function keyTyped() {
  let scale = {
    a: 1.00, s: 1.13, d: 1.25, f: 1.34, g: 1.5, h: 1.72, j: 1.90, k: 2.0,
    l: 2.26, ';': 2.5, "'": 2.66, q: 10, w: 1.06, e: 1.18, t: 1.43,
    y: 1.58, u: 1.82, i: 3.0, o: 2.13, p: 2.38, z: 6.9, x: 0.25,
    c: 0.34, v: 0.5, b: 0.66, n: 0.94, m: 6.0
  };

  if (key in scale) {
    frequency = root * scale[key];
    let nextX = recordTouch.length * 10 + 20;
    if (nextX + 10 < width) {
      recordTouch.push(frequency);
      triOsc.freq(frequency);
      env.play();
    }
  }

  if (key === '1') {playNotes = 1; saveCanvas('mySketch', 'png'); // this saves the canvas as "mySketch.png"
}
  if (key === '2') fr = max(1, fr - 1);
  if (key === '3') fr++;
  if (key === '4') delayTime = max(0, delayTime - 0.01);
  if (key === '5') delayTime += 0.01;
  if (key === '6') feedBack = max(0, feedBack - 0.1);
  if (key === '7') feedBack += 0.1;
  if (key === '8') filterFreq = max(10, filterFreq - 10);
  if (key === '9') filterFreq += 10;
  if (key === '0') {
    recordTouch = [];
    playNotes = 0;
  }
}


