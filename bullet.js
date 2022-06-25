class Circle {
    constructor() {
      this.c = color(255, 0, 0);
      this.x = -10;
      this.y = -10;
      this.d = 10;
      this.velocity = 5;
    }
    display(arg1 = this.c, arg2 = this.d) {
      push();
      fill(arg1);
      ellipse(this.x, this.y, arg2, arg2);
      pop();
    }
    move() {
      this.y -= this.velocity;
    }
    reset()
    {
      this.x = -10;
      this.y = -10;
    }
  }
  

  