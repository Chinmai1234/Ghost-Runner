var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleClimberGroup, invisibleClimber;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200, 50,50)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.5;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleClimberGroup = new Group();

}

function draw() {
  background(200);
if(gameState === "play"){



  
  if(keyDown("up_arrow")){
    ghost.velocityY = -10
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 3
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3
  }
  ghost.velocityY = ghost.velocityY + 0.8
  if(tower.y > 400){
    tower.y = 300
  }
  spawnDoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY  = 0

  }
  if(invisibleClimberGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
    
  }
    drawSprites();
}
    if(gameState === "end"){
      fill("yellow")
    textSize(30)
    text("GameOver", 220, 250)
    }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,50)
    door.addImage("Door", doorImg)
    var climber = createSprite(200,100)
    climber.addImage("climber", climberImg)
    var invisibleClimber = createSprite(200,105)
    invisibleClimber.width = climber.width
    invisibleClimber.height = 2
    invisibleClimber.visible = false;
    door.x = Math.round(random(100,400))
    climber.x = door.x
    invisibleClimber.x = door.x
    door.velocityY = 1
    climber.velocityY = 1
    invisibleClimber.velocityY = 1
    ghost.depth = door.depth
    ghost.depth += 1
    door.lifetime = 300
    climber.lifetime = 300
    invisibleClimber.lifetime = 300
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleClimberGroup.add(invisibleClimber)
  }
}