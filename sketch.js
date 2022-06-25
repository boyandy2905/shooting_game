let x = 0, y = 0, d = 50;

let bullet = [];
let bulletcheck = [];
let bulletNum = 10;

let enemy = [];
let enemyNum = 10;

let fade;
let fadeAmount = 1;

let USERHP = 10;
let SCORE = 0;
let playcheck = 0;

let button;

const DARKCITY = 'darkcity';
const PLANE = 'plane';
const MOON = 'moon';
const PLANET = 'planet';
const SUN = 'sun';

let gImages = {};

function preload()
{
    warpSound = loadSound( 'media/Jump2.wav' )
    backgroundMusic = loadSound( 'media/Summersong2018.mp3' )
    thrustSound = loadSound( 'media/Explosion9.wav' );
    gImages[DARKCITY] = loadImage( 'media/darkcity.png' );
    gImages[PLANE] = loadImage( 'media/plane.png' );
    gImages[MOON] = loadImage( 'media/moon.png' );
    gImages[PLANET] = loadImage( 'media/planet.png' );
    gImages[SUN] = loadImage( 'media/sun.png' );
}

function setup() {
    fade = 0;
    button = createButton('Start Game');
    createCanvas(800, 500);
    background(0); 
    x=width/2;
    y=height-40;
    for(let i = 0; i<bulletNum; i++)
    { 
      bullet[i] = new Circle();
      bulletcheck[i] = 0;
    }
    for(let i = 0; i<enemyNum; i++)
    { 
      enemy[i] = new Enemy();
    }
    backgroundMusic.loop();
    backgroundMusic.setVolume(0.5);
}

function touchStarted() {
  getAudioContext().resume();
}

function draw() {

    background(0);
    image(gImages[ DARKCITY ], 0, 0, width, height);
    print(USERHP);
    colliBulletEnemy();
    colliMeEnemy();
    enemyCheck();
    move();
    bulletCheck();
    push();
    imageMode(CENTER);
    image(gImages[ PLANE ], x, y);
    pop();
    // ellipse(x, y, d, d);
    fill(255,255,255);
    textPrint();
    EndOfGame();
}

function move()
{
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  } 
  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  } 
  if (keyIsDown(UP_ARROW)) {
      y -= 5;
  } 
  if (keyIsDown(DOWN_ARROW)) {
      y += 5;
  }
}

function bulletCheck()
{
  for(let i = 0; i<bulletNum; i++)
  { 
    bullet[i].display();
    bullet[i].move(); 
  }
  for(let i = 0; i<bulletNum; i++)
  { 
    if(bullet[i].y <0)
    {
      bulletcheck[i] = 0;
    }
  } 
}

function keyPressed()
{
  if( key == 'z')
  {     
    for(let i = 0; i<bulletNum; i++)
    {
      if(bulletcheck[i] == 0)
      {
        bullet[i].x = x;
        bullet[i].y = y;
        bulletcheck[i] = 1;
        break;
      }
    }        
  }    
  if(key == 'r')
  {
    reset();
  }
}

function enemyCheck()
{
  let i = 0;
  while(i<enemyNum)
  {
    enemy[i].display2();
    enemy[i].move();
    i++;
  }
  for(let i = 0; i<enemyNum; i++)
  { 
    if(enemy[i].y > height)
    {
      enemy[i].reset();
    }
  } 
}

function colliBulletEnemy()
{
  for(let i = 0; i<enemyNum; i++)
  { 
    for(let j = 0; j<bulletNum; j++)
    {
      let dis = 100;
      if(bulletcheck[j] == 1) 
      {
        dis = dist(bullet[j].x, bullet[j].y, enemy[i].x, enemy[i].y);
      }
      if(dis<enemy[i].d/2)
      {
        thrustSound.play();
        print(dis);
        enemy[i].y=-50;
        SCORE++;
        bulletcheck[j]=0;
        bullet[j].reset();
      }
    }
  }
}

function colliMeEnemy()
{
  for(let i = 0; i<enemyNum; i++)
  { 
    let dis = 100;
    dis = dist(x, y, enemy[i].x, enemy[i].y);
    if(dis<d/2)
    {
      print(dis);
      fill(255,0,0);
      USERHP--;
      warpSound.play();
    }    
  }
}

function textPrint()
{
  push();
  fill(255,255,0);
  rect(0,0,width,30);
  fill(0);
  text("SCORE : " + SCORE, 10, 20);
  text("HP : " + USERHP, width-50, 20);
  pop();
}

function reset()
{
  playcheck++;
  button.hide();
  USERHP = 10;
  SCORE = 0;
  x=width/2;
  y=height-40;
  
  bullet = [];
  bulletcheck = [];
  enemy = [];

  for(let i = 0; i<bulletNum; i++)
  { 
    bullet[i] = new Circle();
    bulletcheck[i] = 0;
  }
  for(let i = 0; i<enemyNum; i++)
  { 
    enemy[i] = new Enemy();
  }
}

function EndOfGame()
{
  if(USERHP<0)
  {
    background(0);
    push();
    fill(0);
    rect(0,0,width,height);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    text("If you want to play the game once again, plz press R", width/2, height/2+20);
    pop();
    warpSound.pause();
    thrustSound.pause();

  }  
  if(playcheck==0)
  {
    background(0);
    push();
    fill(0);
    rect(0,0,width,height);
    fill(255);
    textAlign(CENTER);
    textSize(80);
    text("Dark City", width/2, height/2-40);
    textSize(20);
    fill(255, fade);
    text("If you want to play the game, plz press the button", width/2, height/2+120);
    if (fade < 0)
    {fadeAmount = 4;}
    if (fade > 255)
    {fadeAmount = -4;}
    fade += fadeAmount;
    pop();
    button.center();
    button.position(width/2-40, height/2+30);
    button.mousePressed(reset);
    warpSound.pause();
    thrustSound.pause();
  }  
}
