var ground;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);
  ground = createSprite(300, 350, 600, 10);
  monkey = createSprite(200, 305, 40, 40);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.15;
  ground.velocityX = -10;
  ground.x = ground.width/2;
  survivalTime = 0;
  bananasGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("green")
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  ground.velocityX = -10;
  ground.x = ground.width/2;
  if (frameCount % 5 === 0){
    survivalTime = survivalTime + 1;
  }
  if (bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach();
  }
  spawnObstacles();
  spawnBananas();
  drawSprites();
  score();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(550, 320, 40, 40)
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -10 ;
    obstacle.scale = 0.15;
    obstacle.lifetime = 125;
    obstacle.depth = monkey.depth;
    monkey.depth += 1;
    obstaclesGroup.add(obstacle)
  }
}

function spawnBananas() {
  if (frameCount % 250 === 0) {
    banana = createSprite(550, 150, 40, 40)
    banana.addImage(bananaImage);
    banana.velocityX = -10 ;
    banana.scale = 0.10;
    banana.lifetime = 125;
    banana.depth = monkey.depth;
    banana.depth += 1;
    bananasGroup.add(banana);
  }
}

function score(){
  textSize(20);
  fill("black")
  text("Survival Time = " + survivalTime, 400, 50);
}