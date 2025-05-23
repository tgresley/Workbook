class Edge {
    constructor(from, to) {
      this.from = from;
      this.to = to;
      this.len = 80;
    }
    
    relax() {
      let vx = this.to.x - this.from.x;
      let vy = this.to.y - this.from.y;
      let d = mag(vx, vy);
      if (d > 0) {
        let f = (this.len - d) / (d * 3);
        let dx = f * vx;
        let dy = f * vy;
        this.to.dx += dx;
        this.to.dy += dy;
        this.from.dx -= dx;
        this.from.dy -= dy;
      }
    }
    
    draw() {
      stroke(edgeColor);
      strokeWeight(0.8);
      line(this.from.x, this.from.y, this.to.x, this.to.y);
    }
  }