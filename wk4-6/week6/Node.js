class Node {
    constructor(label) {
      this.x = random(width);
      this.y = random(height);
      this.dx = 0;
      this.dy = 0;
      this.fixed = false;
      this.label = label;
    }
    
    relax() {
      let ddx = 0;
      let ddy = 0;
      for (let j = 0; j < nodeCount; j++) {
        let n = nodes[j];
        if (n !== this) {
          let vx = this.x - n.x;
          let vy = this.y - n.y;
          let lensq = vx * vx + vy * vy;
          if (lensq === 0) {
            ddx += random(1);
            ddy += random(1);
          } else if(lensq < 100 * 100) {
            ddx += vx / lensq;
            ddy += vy / lensq;
          }
        }
      }
      let dlen = mag(ddx, ddy) / 2;
      if (dlen > 0) {
        this.dx += ddx / dlen;
        this.dy += ddy / dlen;
      }
    }
    
    update() {
      if (!this.fixed) {
        this.x += constrain(this.dx, -3, 3);
        this.y += constrain(this.dy, -3, 3);
        this.x = constrain(this.x, 0 , width);
        this.y = constrain(this.y, 0, height);
      }
      this.dx /= 2;
      this.dy /= 2;
    }
    
    draw() {
      if (selection === this) {
        fill(selectColor);
      } else if (this.fixed) {
        fill(fixedColor);
      } else {
        fill(nodeColor);
      }
      
     stroke(nodeStrokeColor);
      strokeWeight(0.5);
      
      rectMode(CORNER);
      let w = textWidth(this.label) + 10;
      let h = textAscent() + textDescent() + 4;
      rect(this.x - w / 2, this.y - h /2, w, h);
      
      fill('#FF10F0');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(25);
      text(this.label, this.x, this.y);
    }
  }