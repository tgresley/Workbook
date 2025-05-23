// interactive data map taken and tweaked from blackbear on Openprocessing 'Visualising data Ch8' https://openprocessing.org/sketch/990368
//debugging done with help of standard OpenAI chatbot


let nodeCount = 0;
let nodes = [];
let nodeTable = {};

let edgeCount = 0;
let edges = [];

let nodeColor;
let selectColor;
let fixedColor;
let edgeColor;
let nodeStrokeColor;

let selection;

// --- Masked Image Shape Variables ---
let img;
let maskedImg1, maskedImg2;
let shapeGraphics1, shapeGraphics2;
let shape1, shape2;

let bgVideo;
let videoPlaying = false;

function preload() {
  img = loadImage('./wk6/sea.jpg'); // Load the image
  bgVideo = createVideo(['./wk6/remindmevid_1.mp4']);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bgVideo.hide();
  bgVideo.loop();
  bgVideo.volume(0); // Mute if needed

  const title = select('#title'); // p5's select, same as document.querySelector
  title.mousePressed(() => {
    if (!videoPlaying) {
      bgVideo.play();
      videoPlaying = true;
    }
  });

  // Setup colors
  nodeColor = color(211, 211, 211);
  selectColor = color(188, 188, 188);
  fixedColor = color(211, 211, 211);
  edgeColor = color('#FF10F0');
  nodeStrokeColor = color('#FF10F0');

  // Load nodes and edges
  loadData();

  // Setup masked shapes
  shape1 = new CustomShape([
    [20, 20], [60, 20], [60, 30], [90, 30], [90, 90], [140, 90],
    [140, 150], [250, 150], [250, 300], [100, 300], [100, 290],
    [50, 290], [50, 120], [30, 120], [30, 70], [20, 70]
  ]);

  shape2 = new CustomShape([
    [550, 330], [650, 330], [650, 490], [670, 490], [670, 520], [640, 520],
    [640, 690], [540, 690], [540, 680], [500, 680], [500, 600], [470, 600],
    [470, 520], [470, 440], [520, 440], [520, 390], [550, 390]
  ]);

  shapeGraphics1 = createGraphics(windowWidth, windowHeight);
  shapeGraphics2 = createGraphics(windowWidth, windowHeight);

  shape1.drawMask(shapeGraphics1);
  shape2.drawMask(shapeGraphics2);

  maskedImg1 = img.get();
  maskedImg2 = img.get();
  maskedImg1.mask(shapeGraphics1);
  maskedImg2.mask(shapeGraphics2);
}

function draw() {
  background(211, 211, 211);

  if (videoPlaying) {
    let x = 700;
    let y = 205;
    let w = width / 2;
    let h = height / 2;
  
    // Draw the video
    image(bgVideo, x, y, w, h);
  
    // Draw the stroke (border)
    noFill();
    stroke('#FF10F0');        // Your pink color
    strokeWeight(2);          // Adjust thickness
    rect(x, y, w, h);
  }

  // --- Detect mouse hover on shape1 ---
  if (shape1.isMouseInside(mouseX, mouseY)) {
    fill(255, 0, 0);  // Solid color (red in this case)
    noStroke();
    shape1.drawShape();  // Draw the shape with the solid color
  } else {
    // --- Draw masked image within the shape ---
    image(maskedImg1, 0, 0, windowWidth, windowHeight);
  }

  // --- Detect mouse hover on shape2 ---
  if (shape2.isMouseInside(mouseX, mouseY)) {
    fill(0, 255, 0);  // Solid color (green in this case)
    noStroke();
    shape2.drawShape();  // Draw the shape with the solid color
  } else {
    // --- Draw masked image within the shape ---
    image(maskedImg2, 0, 0, windowWidth, windowHeight);
  }

  // --- Draw pink outlines ---
  stroke('#FF10F0');
  strokeWeight(2);
  noFill();
  shape1.drawOutline();
  shape2.drawOutline();

  // --- Draw nodes and edges ---
  for (let i = 0; i < edgeCount; i++) {
    edges[i].relax();
  }
  for (let i = 0; i < nodeCount; i++) {
    nodes[i].relax();
  }
  for (let i = 0; i < nodeCount; i++) {
    nodes[i].update();
  }
  for (let i = 0; i < edgeCount; i++) {
    edges[i].draw();
  }
  for (let i = 0; i < nodeCount; i++) {
    nodes[i].draw();
  }

  // --- Cursor behavior ---
  let hovering = false;
  for (let i = 0; i < nodeCount; i++) {
    let n = nodes[i];
    let w = textWidth(n.label) + 10;
    let h = textAscent() + textDescent() + 4;
    if (
      mouseX > n.x - w / 2 && mouseX < n.x + w / 2 &&
      mouseY > n.y - h / 2 && mouseY < n.y + h / 2
    ) {
      hovering = true;
    }
  }

  if (selection !== undefined) {
    cursor('grabbing');
  } else if (hovering) {
    cursor('grab');
  } else {
    cursor(ARROW);
  }
}

// --- CustomShape class ---
class CustomShape {
  constructor(vertices) {
    this.vertices = vertices;
  }

  // Draw the mask (for use with the image)
  drawMask(g) {
    g.push();
    g.fill(255);
    g.noStroke();
    g.beginShape();
    for (let [x, y] of this.vertices) {
      g.vertex(x, y);
    }
    g.endShape(CLOSE);
    g.pop();
  }

  // Draw the outline of the shape (for visualizing)
  drawOutline() {
    push();
    beginShape();
    for (let [x, y] of this.vertices) {
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  // Draw the shape filled with solid color
  drawShape() {
    fill('#FF10F0');  // Example fill color (red)
    beginShape();
    for (let [x, y] of this.vertices) {
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // Check if mouse is inside the shape
  isMouseInside(x, y) {
    let inside = false;
    let j = this.vertices.length - 1;
    for (let i = 0; i < this.vertices.length; i++) {
      let xi = this.vertices[i][0], yi = this.vertices[i][1];
      let xj = this.vertices[j][0], yj = this.vertices[j][1];
      let intersect = ((yi > y) != (yj > y)) &&
                      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
      j = i;
    }
    return inside;
  }
}

// --- Original node/edge logic ---
function loadData() {
  addEdge("drag me", "data");
  addEdge("drag me", "generative");
  addEdge("drag me", "graph");
  addEdge("drag me", "vis");
  addEdge("drag me", "iterate");
  addEdge("iterate", "214860");
  addEdge("214860", "data");
  addEdge("data", "67890w9342");
  addEdge("data", "generative");
  addEdge("67890w9342", "vis");
  addEdge("iterate", "****");
  addEdge("****", "graph");
  addEdge("generative", "vis");
  addEdge("****", "axis");
  addEdge("214860", "index");
  addEdge("generative", "analysis");
  addEdge("generative", "collect");
  addEdge("analysis", "collect");
  addEdge("214860", "slope");
}

function addEdge(fromLabel, toLabel) {
  let from = findNode(fromLabel);
  let to = findNode(toLabel);
  let e = new Edge(from, to);
  edges[edgeCount++] = e;
}

function findNode(label) {
  label = label.toLowerCase();
  let n = nodeTable[label];
  if (n === undefined) {
    return addNode(label);
  }
  return n;
}

function addNode(label) {
  let n = new Node(label);
  nodeTable[label] = n;
  nodes[nodeCount++] = n;
  return n;
}

// Check for clicks on shapes and redirect
function mousePressed() {
  // First check if the click is on one of the shapes
  if (shape1.isMouseInside(mouseX, mouseY)) {
    window.location.href = "./wk6workshop/index.html";
    return; // Early return, prevent further event handling
  } else if (shape2.isMouseInside(mouseX, mouseY)) {
    window.location.href = "./wk6coding/index.html";
    return; // Early return, prevent further event handling
  }

  // If not a shape click, check for node clicks
  let closest = 20;
  for (let i = 0; i < nodeCount; i++) {
    let n = nodes[i];
    let d = dist(mouseX, mouseY, n.x, n.y);
    if (d < closest) {
      selection = n;
      closest = d;
    }
  }
  if (selection !== undefined) {
    if (mouseButton === LEFT) {
      selection.fixed = true;
    } else if (mouseButton === RIGHT) {
      selection.fixed = false;
    }
  }
}

function mouseDragged() {
  if (selection !== undefined) {
    selection.x = mouseX;
    selection.y = mouseY;
  }
}

function mouseReleased() {
  selection = undefined;
}
