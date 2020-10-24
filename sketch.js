var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup, bananaGroup
var score = 0;
var survivalTime = 0;
var ground;      
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  bananaGroup = createGroup();
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

}


function draw() {
  background(300);
   stroke("white");
  textSize(20);
  fill("black");
  text("Score: " + score, 0, 50);
    survivalTime = Math.ceil(frameCount / frameRate())
 
  monkey.collide(ground);
   text("survival Time: " + survivalTime, 100, 50);

  if(gameState===PLAY){    
    

 

  if (ground.x < 0) {
    ground.x = ground.width / 2;
    
      
  }




  if (obstaclesGroup.isTouching(monkey)) {
    monkey.destroy();
    
    gameState = END;
    
       obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
   obstaclesGroup.setLifetimeEach(0);
    bananaGroup.setLifetimeEach(0);
 
   
  }
           
for(var i=0;i<bananaGroup.length;i++){ if(monkey.isTouching(bananaGroup.get(i))){ bananaGroup.get(i).destroy(); } }

  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -10;

  }


  monkey.velocityY = monkey.velocityY + 0.8
  spawnbananas();
  spawnobstacles();


 
  }
  if(gameState===END){
  bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    ground.velocityX=0
  score =0;
    survivalTime=0;
  }
  drawSprites();
}

function reset() {

  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
}

function spawnbananas() {
  if (frameCount % 50 === 0) {
    banana = createSprite(590, 10, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.y = Math.round(random(260, 80));
    banana.depth = monkey.depth;
    monkey.depth = monkey.dept1 + 6;
    bananaGroup.add(banana);
  }
}

function spawnobstacles() {
  if (frameCount % 70 === 0) {
    obstacle = createSprite(590, 326, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.11;
    obstacle.velocityX = -3;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.dept1 + 6;
    obstaclesGroup.add(obstacle);
    
  }
}