var monkey, monkey_running
var banana,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var obstacle, obstacleImage

var PLAY = 1
var END = 0
var gameState = PLAY

var score = 0


function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(windowWidth, windowHeight)  
  
  monkey = createSprite(80, height-125, 20, 20)
  monkey.addAnimation ("running",monkey_running)
  monkey.scale = 0.15
  
  ground = createSprite (400, height-40, width, 85)
  ground.velocityX = -5
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
}


function draw() {
  background("lightblue")
  
  console.log(monkey.y)
  
  if(touches.length > 0 || keyDown("space") && monkey.y > 440){
    monkey.velocityY = -12
    touches = []
  }
  
  monkey.velocityY = monkey.velocityY + 0.3 
  
  
  
  ground.x = ground.width/2
  
  
  
  if(gameState === PLAY){
    stroke("black")
    textSize(25)
    fill("black")
    text("Survival Time " + score,400, 50)
    if(frameCount % 10 === 0){
      score = score + 1
    }
    if(monkey.isTouching(obstacleGroup)){
    gameState = END
    }
  }
  else if(gameState === END){
    reset();
    monkey.velocityY = monkey.velocityY + 5
    monkey.collide(ground)
    stroke("black")
    textSize(50)
    fill("red") 
    text("GAME OVER",150,300)
  }
  
  monkey.collide(ground)

  
  spawn_obstacle();
  spawn_banana();
  drawSprites();
}

function spawn_banana() {
  if(frameCount % 80 === 0) {
    banana = createSprite(width-150, 325, 20, 20)
    banana.addImage (bananaImage)
    banana.scale = 0.1
    banana.velocityX = -5
    banana.y = random(250, 330)
    banana.lifetime = 85
    
    foodGroup.add(banana)  
  }
}

function spawn_obstacle() {
  if(frameCount % 300 === 0){
    obstacle = createSprite(width-150, 485, 20, 20)
    obstacle.addImage (obstacleImage)
    obstacle.scale =0.25
    obstacle.velocityX = -5
    obstacle.lifetime = 85
    
    obstacleGroup.add(obstacle)
  }
    

}

function reset(){
  
  banana.destroy();
  obstacle.destroy();
  obstacle.velocityX = 0
  banana.velocityX = 0
  banana.lifetime = -1
  obstacle.lifetime = -1  
}
