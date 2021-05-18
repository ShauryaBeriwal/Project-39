var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tiger, tiger_collided, tiger_running;
var ground, invisibleGround, groundImage;

var stoneGroup, stone1, stone2, stone3;

var score=0;

var gameOver, restart;
var gameOverImage, restartImage

function preload(){
  tiger_running = loadAnimation("Tiger.png");
  tiger_collided = loadAnimation("Tiger2.png");
  
  groundImage = loadImage("ground.png");
  
  stone1 = loadImage("stone.png");
  stone2 = loadImage("stone2.png");
  stone3 = loadImage("stone3.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  tiger = createSprite(50,180,20,50);
  
  tiger.addAnimation("running", tiger_running);
  trex.addAnimation("collided", tiger_collided);
  tiger.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  stoneGroup = new Group();
  
  score = 0;
}

function draw() {
   background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && tiger.y >= 159) {
      tiger.velocityY = -12;
    }
  
    tiger.velocityY = tiger.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    tiger.collide(invisibleGround);
    spawnObstacles();
  
    if(stoneGroup.isTouching(tiger)){
        gameState = END;
    }
  }
    else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    tiger.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    
    tiger.changeAnimation("collided",tiger_collided);

    stoneGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(stone1);
              break;
      case 2: obstacle.addImage(stone2);
              break;
      case 3: obstacle.addImage(stone3);
              break;
      default: break;
    }
              
    stone.scale = 0.5;
    stone.lifetime = 300;
    
    stoneGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach();
  
  tiger.changeAnimation("running",tiger_running);
  
  score = 0;
  
}