
var trex ,trex_running , ground , ground_image , iground , cloud_image;
var ob1,ob2 , ob3 , ob4 , ob5 , ob6;
var score = 0;
var obstaclesGroup,cloudsGroup , trex_collided , gameOver , gameOverImg , restart , restartImg;

var PLAY =1;
var END =0
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
  ground_image = loadImage("ground2.png");

  cloud_image = loadImage("cloud.png");

  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  trex_collided = loadAnimation("trex_collided.png");


  

}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex = createSprite(50 , 160 , 20 , 50);
 trex.addAnimation("running" , trex_running);
 trex.addAnimation("collided" , trex_collided);

 ground = createSprite(300 , 180 , 600 , 20); // x= w/2
 ground.addImage(ground_image);

 iground = createSprite(300 , 185 , 600 , 10)

 var ran = Math.round(random(10,60))
 iground.visible=false;
 //console.log(ran);

 obstaclesGroup = new Group();
 cloudsGroup = new Group();

 //trex.debug = true;;

 trex.setCollider("circle",0,0,40);

 gameOver = createSprite(300 , 100);
 gameOver.addImage(gameOverImg);

 restart = createSprite(300 , 40);
 restart.addImage(restartImg);

 gameOver.visible = false;
 restart.visible = false;

}

function draw(){

  background("white");
text("SCORE : " + score , 500 , 50);
score =score+Math.round(frameCount/500);//60 /60.  0+60/60 =0+1 =1 + 1+1

if(gameState === PLAY){
 
  score =score+Math.round(frameCount/500);

 ;

  if(keyDown("up_arrow") && trex.y >133) { 
    trex.velocityY = -12;
    }

   ground.velocityX = -(8+score/100);
      
      spawnClouds();
      spawnObstacles();

     if(obstaclesGroup.isTouching(trex)){
      gameState= END;
     } 
}
else if (gameState ===END){

  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  trex.changeAnimation("collided",trex_collided);

  gameOver.visible = true;
  restart.visible = true;
  score=0;

  if(mousePressedOver(restart)) {
    reset();
  }
  
}

trex.velocityY = trex.velocityY+0.7;


//console.log(trex.y);

trex.collide(iground);



 if(ground.x <0){
  ground.x =ground.width/2;
 }






  drawSprites();
  

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running" , trex_running);
}

function spawnClouds(){
  if(frameCount % 60 ==0){     
 cloud =createSprite(600,100,40,10);
 cloud.velocityX = -3
 cloud.addImage(cloud_image);
 cloud.y = Math.round(random(10 , 60));

 console.log(cloud.depth);
 trex.depth =cloud.depth+1;
cloud.lifetime = 300; 
 cloudsGroup.add(cloud);


  } 
}

function spawnObstacles() {
if(frameCount % 60 == 0) {
  obstacles = createSprite(600 , 165 , 10 , 40);
  obstacles.velocityX = -(8+score/100);

  var rand =Math.round(random(1,6));

  switch(rand){
    case 1: obstacles.addImage(ob1);
    break;

    case 2: obstacles.addImage(ob2);
    break;

    case 3: obstacles.addImage(ob3);
    break;

    case 4: obstacles.addImage(ob4);
    break;

    case 5: obstacles.addImage(ob5);
    break;

    case 6: obstacles.addImage(ob6);
    break;
    default :break;
  }

  obstacles.scale = 0.5;
  obstacles.lifetime = 300;  
  obstaclesGroup.add(obstacles);

  
}
}

//120/60 = 2   Q
// 120% 60 = 0 modulo  R

//123 %60 = 
