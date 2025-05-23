let FONT;
let overlayfont;
let gridData = [];
let trailLayer;
let scrollX;

function preload(){
	FONT = loadFont ('../wk5/HV.ttf')
	overlayfont = loadFont ("../wk5/HomeVideo.ttf")
}


function setup() {
	createCanvas(windowWidth, windowHeight * 3);


    let cols = 60;
    let rows = 30;
    let gridWidth = width - 100;
    let gridHeight = windowHeight - 100;
    let offsetX = 50;
    let offsetY = 50;
    let cellW = gridWidth / cols;
    let cellH = gridHeight / rows;
    
    for (let i = 0; i < cols; i++) {
      gridData[i] = [];
      for (let j = 0; j < rows; j++) {
        // Store a color for each cell
        if (random() < 0.5) {
          gridData[i][j] = color(255);
        } else {
          gridData[i][j] = color(179, 250, 210);
        }
      }
    }

    trailLayer = createGraphics(windowWidth, windowHeight * 3);
    trailLayer.clear(); // transparent background



topHeight = windowHeight;
middleHeight = windowHeight;
bottomHeight = windowHeight;

scrollX = windowWidth;
}

function draw() {

    background(0, 0, 255,0); // replaces fill+rect combo
    drawTopSection(0, topHeight);
    drawMiddleSection(topHeight,middleHeight)
    drawBottomSection(topHeight + middleHeight, bottomHeight); 
  }


  function drawTopSection (y,h) {
    push();
    translate(0, y);
    noStroke(); 
    fill(255, 255, 255);
    rect(0, 0, width, h); 


  
	stroke('#08BC01');
	strokeWeight (1);
    fill('#08BC01');
    textFont(FONT);
    textSize(25);
    textAlign(LEFT, TOP);
    textLeading(40);


    let title = 'Workshop5__\nTypeAndCamera';
    let type = 'p*5__\n PoeticsOfType';
    let face = 'p*5__\n TheFaceAsImage';
    let learn =  'Code__\n LearningThroughDoing';
    let paragraph1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve.`;
    let paragraph2 = `We are slaves to our machines.\n Our camera watches us.\n Our fingers become our mouths.`;
    let paragraph3 = `All text here coded with p5`;
    let columntext = 'textFont(Helvetica);\ntextSize(25);\ntextAlign(LEFT, TOP);\ntextLeading(40);';
    let WORD = '(~_^)';

    text(title, 20, 20, 400);
    text(type, 20, h * 1/3 - 95, 400);
    text(face, 20, h * 2/3 - 95, 400);
    text(learn, 20, h - 95, 400);
    
    text(paragraph1, windowWidth - 460, 20, 400);
    text(paragraph2, windowWidth - 460, h * 2/3 - 95, 400);
    text(paragraph3, windowWidth - 460, h - 95, 400);

    text(columntext, windowWidth - 900, (windowHeight*1)/3 - 95, 400);


    image(trailLayer, 0, 0);  

trailLayer.push();
trailLayer.fill(255, 255, 0);
trailLayer.noStroke();
trailLayer.textFont(FONT);
trailLayer.textSize(60);
trailLayer.textAlign(CENTER, CENTER);
textLineToBuffer(trailLayer, "Isnt this Fun?", 60, 35, 130, mouseX, constrain(mouseY, 0, h));
trailLayer.pop();

function textLineToBuffer(pg, text2, s, x1, y1, x2, y2){	
	pg.push();
	let letters = split(text2, '');
	pg.translate(x1, y1);
	for (let i = 0; i < letters.length; i++) {
		pg.push();	
		pg.translate(
			(i * (x2 / letters.length)) - (x1 * i / letters.length),
			(i * (y2 / letters.length)) - (y1 * i / letters.length)
		);
		pg.textSize(s);
		pg.text(letters[i], 0, 0);
		pg.pop();
	}
	pg.pop();
}


        push();
        textFont(overlayfont);
        
        // Setup dynamic font size BEFORE drawing
        let targetHeight = h;
        let testSize = 50;
        textSize(testSize);
        while (textWidth(WORD) < targetHeight && testSize < 2000) {
          testSize += 5;
          textSize(testSize);
        }        
        translate(windowWidth - 300, 0); // More visible position
        rotate(HALF_PI);
        scale(1, 2); // or try reducing to 0.5 if too big
        
        fill(255, 114, 208, 100);
        stroke(255, 114, 208, 40);          
        strokeWeight(30); 
        text(WORD, 0, 0);
        pop();

  pop();
  }




  
  function drawMiddleSection(y, h) {
    push();
    translate(0, y);
  
    let cols = 60;
    let rows = 30;
    let gridWidth = width - 100;
    let gridHeight = h - 100;
    let offsetX = 50;
    let offsetY = 50;
    let cellW = gridWidth / cols;
    let cellH = gridHeight / rows;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = offsetX + i * cellW;
        let y = offsetY + j * cellH;
    
        fill(gridData[i][j]);
        noStroke();
        rect(x, y, cellW, cellH);
      }
    }
    noStroke();    
    // Draw the pink background rectangle *after* the grid
    fill(0,0,0,0); // make it semi-transparent so you still see the grid
    rect(0, 0, width, h);
  
    pop();
  }
  function drawBottomSection(y, h) {
    push();
    translate(0, y);
    fill(0, 0, 255);
    rect(0, 0, width, h);
    pop();
  
    // Long paragraph text
    let reflection = `In the week 5 workshop, we explored algorithms and how we interact with them—both in our everyday lives and on the screen. We also discussed the relationship between type and the camera, which I found really interesting. It felt like this workshop was more focused on conversation, so there isn’t much visual output to show. Instead, the discussion inspired the elements you see on this page. Refresh to generate a new grid above.`;
  
    // Text setup
    fill(255);
    textFont(FONT);
    textSize(80);
    textAlign(LEFT, TOP);
    textLeading(90);
  
    let textBoxWidth = width;
    let paragraphHeight = h; // estimated height for the paragraph
  
    // Draw the scrolling paragraph as a block
    push();
    translate(scrollX, y + h / 2 - paragraphHeight / 2);
    text(reflection, 0, 0, textBoxWidth);
    pop();
  
    // Scroll logic
    scrollX -= 4;
  
    // If it's scrolled past its own width, reset
    if (scrollX < -textBoxWidth) {
      scrollX = width;
    }
  }
  