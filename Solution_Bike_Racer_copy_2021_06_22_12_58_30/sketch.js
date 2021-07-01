
var cr1;
var bg;
var hole;
var cone;
var ground;

var obstacle1,obstacle2
var path;

var Obstacles;
var PLAY=1,END=0;
var gameState=PLAY;
var distance;


function preload(){
cr1=loadAnimation("images/Cycle_Race2-0.png","images/Cycle_Race2-1.png","images/Cycle_Race2-2.png","images/Cycle_Race2-3.png","images/Cycle_Race2-4.png","images/Cycle_Race2-5.png","images/Cycle_Race2-6.png","images/Cycle_Race2-7.png",
"images/Cycle_Race2-8.png","images/Cycle_Race2-9.png","images/Cycle_Race2-10.png","images/Cycle_Race2-11.png",
"images/Cycle_Race2-12.png","images/Cycle_Race2-13.png","images/Cycle_Race2-14.png","images/Cycle_Race2-15.png")
bg=loadImage("images/bg.png")
holeImg=loadImage("images/Hole1.png");
coneImg=loadImage("images/Cone3.png");
ground=loadImage("images/track1.jpg")
gameOverImg=loadImage("images/gameOver.png")
}


function setup(){
createCanvas(windowWidth,400);

path=createSprite(windowWidth/2,380,windowWidth,20);

path.addImage(ground);
path.velocityX = -2;
path.x = width/2;
invisiblepath=createSprite(windowWidth/2,390,windowWidth,30)
invisiblepath.visible=false;

cycle_race=createSprite(windowWidth/4,350);
cycle_race.addAnimation("RUN",cr1);
cycle_race.scale=0.2

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 1;



obstacle1=new Group();
obstacle2=new Group();


}
function draw(){
  background(255);

  if(gameState===PLAY){
    gameOver.visible = false;
    //distance = distance + Math.round(getFrameRate()/50);
    //path.velocityX = -(6 + 2*distance/150);

  if(path.x < 0 ){
    path.x = width/2;

  }
  if(keyDown("up")){
    cycle_race.y=cycle_race.y-2
    
  }
  if(keyDown("down")){
    cycle_race.y=cycle_race.y+2
    
  }
  edges=createEdgeSprites()
  cycle_race.collide(invisiblepath)
  cycle_race.collide(edges[2])

  var Non_Playing_Character = Math.round(random(1,2))
  
  
  if (frameCount % 250 == 0) {
    if (Non_Playing_Character == 1) {
      Hole();
      
      
    } else if (Non_Playing_Character == 2) {
      Cone();
      
    } 
  }

  if(obstacle1.isTouching(cycle_race)){
    gameState = END;
    

   }
   
   if(obstacle2.isTouching(cycle_race)){
     gameState = END;
     
   }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Spacebar to Restart the game!", 500,200);
  
    path.velocityX = 0;
    cycle_race.velocityY = 0;

    obstacle1.setVelocityXEach(0);
    obstacle1.setLifetimeEach(-1);
  
    obstacle2.setVelocityXEach(0);
    obstacle2.setLifetimeEach(-1);

  reset();
}

drawSprites();
  }


  
  

 


function Cone(){
  cone=createSprite(windowWidth/2,Math.round(random(50, 250)),10,10);
  cone.addImage(coneImg)
  cone.scale =0.1;
  cone.velocityX = -2;
  
  cone.setLifetime=200;
  obstacle1.add(cone);
}
  function Hole(){
  hole=createSprite(windowWidth-50,Math.round(random(50, 250)),10,10);
  hole.addImage(holeImg)
  hole.scale =1;
  hole.velocityX = -2;
  
  hole.setLifetime=170;
  obstacle2.add(hole);
  }

  function reset(){
   
    gameOver.visible = false;
    
    
    obstacle1.destroyEach();
    obstacle2.destroyEach();
    
    
  }