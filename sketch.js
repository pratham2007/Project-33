const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var particle;
var plinkos = [];
var divisions = [];

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var divisionHeight=300;
var score = 0;

var turn = 0;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50)
    {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50)
    {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,375));
    }

    Engine.run(engine);

}

function mousePressed(){
  if(turn <=5){
    turn++;
    particle = new Particle(mouseX, 10, 10);
  }
}

function draw() {
  Engine.update(engine);
  background("black");

  ground.display();

if(gameState===PLAY){
  text("150", 20, height/2+160);
  text("100", 100, height/2+160);
  text("300", 180, height/2+160);
  text("500", 260, height/2+160);
  text("200", 340, height/2+160);
  text("150", 420, height/2+160);
  text("250", 500, height/2+160);
  text("200", 580, height/2+160);
  text("50", 660, height/2+160);
  text("300", 740, height/2+160);


  textSize(20)
  text("Score : "+score, 20, 30);

  push();
  fill("yellow");
  noStroke();
  rect(width/2, height/2+300, width, 5);
  pop();

   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }

  if(particle!=null){
    particle.display();

     if(particle.body.position.y > height/2+300){
        if(particle.body.position.x > 0 && particle.body.position.x < 80){
          score = score + 150;
          particle = null;
        } else if(particle.body.position.x > 80 && particle.body.position.x < 160){
          score = score + 100;
          particle = null;
        } else if(particle.body.position.x > 160 && particle.body.position.x < 240){
          score = score + 300;
          particle = null;
        } else if(particle.body.position.x > 240 && particle.body.position.x < 320){
          score = score + 500;
          particle = null;
        } else if(particle.body.position.x > 320 && particle.body.position.x < 400){
          score = score + 200;
          particle = null;
        } else if(particle.body.position.x > 400 && particle.body.position.x < 480){
          score = score + 150;
          particle = null;
        } else if(particle.body.position.x > 480 && particle.body.position.x < 560){
          score = score + 250;
          particle = null;
        } else if(particle.body.position.x > 560 && particle.body.position.x < 640){
          score = score + 200;
          particle = null;
        } else if(particle.body.position.x > 640 && particle.body.position.x < 720){
          score = score + 50;
          particle = null;
        } else if(particle.body.position.x > 720 && particle.body.position.x < 800){
          score = score + 300;
          particle = null;
        }
     }
  }
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(turn >= 5 && particle === null){
    gameState=END;
  }
} else if(gameState===END){
  textSize(40);
  text("GAME OVER", width/2-100, height/2);
}
}
