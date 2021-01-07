const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var particle;
var score=0;
var points=0;
var gameState="play";
var plinko = [];
var division = [];
var divisionHeight=300;

function setup() {
  createCanvas(500,800);
  engine = Engine.create();
  world = engine.world;

  for(var i = 50; i <= width; i=i+60){
    plinko.push(new Plinko(i,75));
}

for(var i = 25; i <= width; i=i+60){
  plinko.push(new Plinko(i,175));
}

for(var i = 50; i <= width; i=i+60){
  plinko.push(new Plinko(i,275));
}

for(var i = 25; i <= width; i=i+60){
  plinko.push(new Plinko(i,375));
}

for(var j = 10; j<=width; j=j+80){
  division.push(new Division(j,height-divisionHeight/2,10,divisionHeight))
}

  ground = new Ground(240,796,600,10);

}

function draw() {
  background("black");  
  fill("blue");
  textSize(25);
  text("Score:"+score,10,50);
  fill("green");
  text("500",30,540);
  text("500",110,540);
  text("100",190,540);
  text("100",260,540);
  text("200",350,540);
  text("200",430,540);
  Engine.update(engine);

  ground.display();

  for(i=0;i<plinko.length;i++){
    plinko[i].display();
  }

  for(j=0;j<division.length;j++){
    division[j].display();
  }


  if(particle!=null)
   {
      particle.display();
       
       if (particle.body.position.y>760)
       {
             if (particle.body.position.x < 180 && particle.body.position.x > 10) 
             {
                 score = score + 500;         
             }
              if (particle.body.position.x < 500 && particle.body.position.x > 320 ) 
             {
                   score = score + 200;
             }
             if (particle.body.position.x > 180 && particle.body.position.x < 340 )
             {
                   score = score + 100;
             }  
             
             particle = null;
             if(points>=5)
             gameState="end";
  
}
   }

   if(gameState=="end"){
     textSize(40);
     fill("white");
     stroke("white");
     text("GAME OVER!!",140,340);
   }

}

function mousePressed(){
  if(gameState!=="end"){
    points++;
    particle=new Particle(mouseX,10,10,10);
  }
}