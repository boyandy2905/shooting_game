class Enemy {
    constructor() {
      this.c = color(random(50,255), random(50,255), random(50,255));
      this.d = 20;
      this.x = random(0+this.d/2,width-this.d/2);
      this.y = 30+this.d/2;      
      this.rand = int(random(2));
      if(this.rand == 0) { this.velocityX = random(0,3); } 
      else if(this.rand == 1) { this.velocityX = -random(0,3); } 
      this.velocityY = random(0, 2);
      this.rand = int(random(1, 4));
      switch(this.rand)
      {
        case 1 :
          this.img = gImages[ MOON ];
          break;
        case 2 :
          this.img = gImages[ PLANET ];
          break;
        case 3 :
          this.img = gImages[ SUN ];
          break;
      }
    }
    display(arg1 = this.c, arg2 = this.d) {
      push();
      fill(arg1);
      rectMode(CENTER);
      rect(this.x, this.y, arg2, arg2);
      pop();
    }
    display2(img, arg2 = this.d) {
      push();
      imageMode(CENTER);
      image(this.img, this.x, this.y, arg2, arg2);
      pop();
    }
    reset()
    {
      this.c = color(random(255), random(255), random(255));
      this.x = random(0,width);
      this.y = 0+this.d;
      this.rand = int(random(2));
      if(this.rand == 0) { this.velocityX = random(0,2); } 
      else if(this.rand == 1) { this.velocityX = -random(0,2); } 
      this.velocityY = random(0,2);
    }
    move() {
      this.x += this.velocityX;
      this.y += this.velocityY;    
      if(this.x > width-(this.d/2) || this.x < 0+(this.d/2))
      {
          this.velocityX *= -1;
      }
    }
  }