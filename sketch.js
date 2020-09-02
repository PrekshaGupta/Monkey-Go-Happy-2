var bananaImg, foodGroup;
var obstacleImg, obstacleGroup;
var backgroundImg, backdrop;
var player, player_running;
var ground;

var score;

function preload(){
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backgroundImg = loadImage("jungle.jpg"); 
}

function setup() {
  createCanvas(800, 400);
  
  backdrop = createSprite(0,0,800,400);
  backdrop.addImage(backgroundImg);
  backdrop.scale = 1.5;
  backdrop.x = backdrop.width/2;
  backdrop.velocityX = -4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,360,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  score = 0;
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(backdrop.x < 0){
    backdrop.x = backdrop.width/2;
  }
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score){
    case 10: player.scale = 0.12
      break
    case 20: player.scale = 0.14
      break
    case 30: player.scale = 0.16
      break
    case 40: player.scale = 0.18
      break  
    default : break
  }
    
  stroke("white");
  textSize(20);
  fill("white");
  text('Score : '+ score,500,50);
    
     //jump when the space key is pressed
   if(keyDown("space") && player.y >= 305){
      player.velocityY = -12 ;   
}
  
    //add gravity
    player.velocityY = player.velocityY + 0.8;
    
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles
    spawnObstacles();
  
    if(obstacleGroup.isTouching(player)){
      player.scale = 0.08;
    }
  
  player.collide(ground);

 drawSprites(); 
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    obstacle = createSprite(800,325,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImg);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 0;
    
    obstacle.lifetime = 135;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -6;
    
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
     //assign lifetime to the variable
    banana.lifetime = 135;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
  
}