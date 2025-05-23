let sound, analyzer, volume, string, myButton;
let angleOffset = 0;
let bgColor;
let particles = [];
let wave = [];
let emojis = ["💥", "🎉", "🌀", "🔥", "👁", "💃", "🧠", "🌈"];
let emojiRain = [];

function preload() {
  sound = loadSound("../wk6/bark.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight * 2);
  bgColor = color('#FF10F0');
  background(bgColor);
  textAlign(CENTER, CENTER);
  textFont('Courier New');

  getAudioContext().suspend();
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  string = "DANCE";

  myButton = createButton("DANCE NOW!");
  myButton.position(random(width), random(height / 2));
  myButton.mousePressed(toggleMusic);

  for (let i = 0; i < 300; i++) {
    particles.push(createParticle());
  }

  for (let i = 0; i < 100; i++) {
    emojiRain.push(createEmoji());
  }
}

function draw() {
  bgColor = color(
    150 + sin(frameCount * 0.1) * 100,
    150 + cos(frameCount * 0.1) * 100,
    200 + sin(frameCount * 0.2) * 50
  );
  background(bgColor.levels[0], bgColor.levels[1], bgColor.levels[2], 40);

  volume = analyzer.getLevel();
  let mappedVol = map(volume, 0, 1.0, 10, 500);

  // Particle blob
  fill(map(volume, 0, 1, 100, 255), 100, 255, 200);
  noStroke();
  ellipse(
    constrain(mouseX + sin(frameCount * 0.05) * 50, 0, width),
    constrain(mouseY + cos(frameCount * 0.05) * 50, 0, height / 2),
    mappedVol * 0.7 + sin(frameCount * 0.5) * 50
  );

  // Crazy particles
  for (let p of particles) {
    fill(p.col.levels[0], p.col.levels[1], p.col.levels[2], p.alpha);
    ellipse(p.x, p.y, p.size * (1 + volume * 3));
    p.x += p.speedX * (1 + volume * 3);
    p.y += p.speedY * (1 + volume * 3);
    p.alpha -= 0.8;

    if (p.x < 0 || p.x > width) p.speedX *= -1;
    if (p.y < 0 || p.y > height / 2) p.speedY *= -1;
    if (p.alpha < 0) Object.assign(p, createParticle());
  }

  // Glitching rotating text
  push();
  translate(width / 2 + random(-10, 10), height / 4 + random(-10, 10));
  rotate(angleOffset + random(-0.2, 0.2));
  textSize(mappedVol * 0.4);
  fill(random(255), random(255), random(255));
  text(string, random(-30, 30), random(-30, 30));
  pop();

  angleOffset += 0.1;

  // Button flying around
  myButton.position(
    width / 2 + sin(frameCount * 0.06) * 300 + random(-20, 20),
    height / 4 + cos(frameCount * 0.06) * 300 + random(-20, 20)
  );

  // Waveform madness
  let waveform = fft.waveform();
  strokeWeight(random(1, 5));
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height / 4 - 150, height / 4 + 150);
    stroke(random(255), random(255), random(255));
    vertex(x, y);
  }
  endShape();

  // Emoji rain
  textSize(32 + sin(frameCount * 0.2) * 10);
  for (let emoji of emojiRain) {
    text(emoji.char, emoji.x, emoji.y);
    emoji.y += emoji.speed + volume * 50;
    if (emoji.y > height) Object.assign(emoji, createEmoji());
  }

  // Spawn more chaos
  if (frameCount % 30 === 0) {
    for (let i = 0; i < 20; i++) {
      particles.push(createParticle());
    }
  }
}

function createParticle() {
  return {
    x: random(width),
    y: random(height / 2),
    size: random(5, 30),
    speedX: random(-5, 5),
    speedY: random(-5, 5),
    col: color(random(255), random(255), random(255)),
    alpha: 255
  };
}

function createEmoji() {
  return {
    x: random(width),
    y: random(-height, 0),
    char: random(emojis),
    speed: random(1, 3)
  };
}

function mousePressed() {
  getAudioContext().resume();
  analyzer.setInput(sound);
  fft.setInput(sound);
  loop();
  toggleMusic();
}

function keyPressed() {
  if (key === 'b') {
    bgColor = color(random(255), random(255), random(255));
  } else {
    string += key + "!";
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle());
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 2);
}

function toggleMusic() {
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.loop();
  }
}
