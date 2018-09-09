var boom = [];
var clouds = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  for(var i=0;i<100;i++){
   boom.push(new mountain(random(50,300),random(100,500))); 
   clouds.push(new cloud());
  }
 }

function draw(){
  background(255);
  translate(windowWidth, windowHeight);
  for(var i=0;i<boom.length;i++){
      fill(255, 204, 0);
      boom[i].move();
      fill(127, 221, 255);
      clouds[i].move();
      if(boom[i].start < -(windowWidth + 1000)){
        boom[i] = new mountain(random(50,300),random(100,500));
      }
      if(clouds[i].x < -(windowWidth + 1000)){
        clouds[i] = new cloud();
      }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function wall(Height, Width){
  fill(201, 239, 134);
   rect(starting_point, -100 , starting_point + Width, 30, 10);
}



function mountain(Height, _Width){
  this.start = random(-windowWidth, windowWidth + 1000);
  this.Width = _Width
  
  
  this.move = function(){
    triangle(this.start , 0, this.start  + _Width/2, 0  - Height,this.start  + _Width , 0);
    this.start -= 1;
  }
}


function cloud() {
  this.x = random(- windowWidth, windowWidth);
  this.y = -random(500,1000);
  this.size = random(0.5,5);
  this.shaker = 0;
  this.counter = false;
  this.speed = random(1,2.0);
  this.shake_speed = random(0,0.5);
  
  noStroke();
  
  this.move = function(){
    arc(this.x, this.y, 25 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
    arc(this.x + 10,this.y, 25 * this.size, 45 * this.size, PI + TWO_PI, TWO_PI);
    arc(this.x + 25, this.y, 25 * this.size, 35 * this.size, PI + TWO_PI, TWO_PI);
    arc(this.x + 40, this.y, 30 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
    this.x-=this.speed;
    this.y -= this.shake_speed;
    

    
    
    
  }
}
