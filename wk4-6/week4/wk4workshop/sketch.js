let bg;
let face;





function preload(){
bg= loadImage ('../wk4/kusamaphotobg.jpg');
face = loadImage ('../wk4/yayoi_face.png');
}

function setup(){
    createCanvas (windowWidth, windowHeight * 2);
    
}


function draw(){

    image(bg, 0, 0, windowWidth, windowHeight );

   
    image(bg, 0, windowHeight, windowWidth, windowHeight );

    fill ('red');
    noStroke();
    rect(0, windowHeight, windowWidth, windowHeight );

    let reflection = ' I used this exhibition as an opportunity to explore interactive web archives of works - my result is seen above. Using a new web visual style for the work of Kusama, i was able to capture a unique reflection the "randomness" of her work (i think at least). By generating her face as a dot, in a sense, p5 was able to make this experimentation easy'
  
    push ();
    fill ('white');
    textFont('Helvetica');      // font-family: Helvetica, sans-serif
  textSize(30);               // font-size: 30px
  textStyle(NORMAL);          // font-weight: 400
  textLeading(30);  
    scale(1, 1.5);    
    text(reflection, windowWidth- 540, windowHeight/2+190, 480, 700)
pop ();


let exhibitionreflection = 'While walking through the exhibition, I was really struck—and at first, even a bit offended—by the lack of direct human interaction with the art. All I could see were people viewing it through their screens, creating a new, mediated image of the original. It made me reflect on the idea of interaction in a gallery space, and how Kusama’s “rooms” are essentially interactive works. They aren’t just meant to be observed; they’re designed for a different kind of engagement—one shaped by selfies, photographs, and the act of viewing through a screen, with all its social and political layers. I’m still not sure how I feel about that.'

push ();
fill ('white');
textFont('Helvetica');      // font-family: Helvetica, sans-serif
textSize(20);               // font-size: 30px
textStyle(NORMAL);          // font-weight: 400
textAlign(RIGHT, TOP); 
textLeading(20);  
scale(1, 1.5);    
text(exhibitionreflection, 40 , windowHeight -190, 400, 700)
pop ();


let faceWidth = 70;  // width of each face image
let faceHeight = 80; // height of each face image
let x = windowWidth - 200; // position near the right side

for (let y = 100; y < height - windowHeight - 100; y += faceHeight + 20) {
  image(face, x, y, faceWidth, faceHeight);
}


  for (let y = 100; y < height - windowHeight - 260; y += faceHeight + 20) {
    image(face, x - 90, y, faceWidth, faceHeight);
  }

  for (let y = 100; y < height - windowHeight/3; y += faceHeight + 20) {
    image(face, x - 450, y, faceWidth, faceHeight);
  }

  for (let y = 100; y < height- windowHeight - 450; y += faceHeight + 20) {
    image(face, x - 1250, y, faceWidth, faceHeight);
  }


  


}