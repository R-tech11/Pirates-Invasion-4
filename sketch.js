const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, ground, BGImg, tower, towerImg;
var canon;
var balls = [];
var boat, boats = [];

function preload() {
  BGImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var ground_options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width*2, 1, ground_options);
  World.add(world, ground);

  tower = Bodies.rectangle(150, 350, 160, 310, ground_options);
  World.add(world, tower);

  canon = new Canon(160, 110, 130, 100, 0);

  angleMode(DEGREES);

  angle = 15;


 
}

function draw() {
  
  image(BGImg, 0, 0, 1200, 600);
 
  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width*2, 1);

  push();

  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);

  pop();

  canon.display();

  for(var i = 0; i < balls.length; i++)
  {
    showCanonBalls(balls[i], i);

    collisionWithBoat(i);
  }
  
  showBoats();
}

function keyReleased()
{
  if(keyCode == DOWN_ARROW)
  {
    balls[balls.length - 1].shoot();
  }
}

function keyPressed()
{
  if(keyCode == DOWN_ARROW)
  {
    var canonBall;
    canonBall = new CanonBall(canon.x, canon.y);
    balls.push(canonBall);

  }
}

function showCanonBalls(ball, i)
{
  if(ball)
  {
    ball.display();

    if(ball.body.position.x >= width || ball.body.position.y >= height - 50)
    {
      ball.remove(i)
    }
  }
}


function showBoats()
{
  if(boats.length > 0)
  {
    if(boats[boats.length - 1] === undefined || boats[boats.length - 1].body.position.x < width - 300)
    {
      var position = random([-40, -70, -20, -60, -80]);
      boat = new Boat(width - 80, height - 60, 170 , 170, position);
      boats.push(boat);
      
    }
  for(var i = 0; i < boats.length; i++)
  {
    if(boats[i])
    {
      Matter.Body.setVelocity(boats[i].body, {x: -1, y:0});
      boats[i].display();
    }
  }
}
    else
    {
      boat = new Boat(width - 80, height - 60, 170 , 170, -80);
      boats.push(boat);
    }
  }

function collisionWithBoat(index)
{
  for(var i = 0; i < boats.length; i++)
  {
    if(balls[index] !== undefined && boats[i] !== undefined)
    {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if(collision.collided)
      {
        boats[i].remove(i);
        //balls[index].remove(index);
        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}