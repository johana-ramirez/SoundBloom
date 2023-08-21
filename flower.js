/*
This class represents a flower and is represented by a circle
*/
class Flower {
  constructor(col, size, x, y, len, points, starCol) {
    //physical traits 
    this.col = col; 
    this.ogSize = size; 
    this.size = size;
    this.position = createVector(x, y); 
    this.len = len //how many circles are used for the flower, based on tempo
    this.points = points; //how many points the flower has, based on song's danceability score 
    this.starColor = starCol; //color of flower bud based on song's valence score
    
    //creates object for seeds that come from flower 
    this.seeds = new seedSystem(random(1, 3), random(1, 5), this.position.x, this.position.y, 
                                this.col, this.len, this.points, this.starColor);
    //boolean to know if flower should show its seeds
    this.reproduce = false; 
    //boolean for flower to shrink 
    this.dissapear = false; 
    //boolean to know that flower will stay shrunk 
    this.dying = false; 
    //boolean used to know if seeds should be created 
    this.gone = false; 
    //boolean to know if flower bud was drawn 
    this.star = false;
    //how long the flower should stay at its biggest size
    this.bloom = size* random(500, 800); 
    //holds the flower circles 
    this.circles = [];
    //radius vaaraibles for flower bud 
    this.radius1 = size * 5;
    this.radius2 = size * 6;  
  }
  
  //function that creates the petals of the flower
  createCircles(){
    //add to the arr 
    for(let j = 0; j < this.len; j++){
    let r = 60/this.len;
    let len = this.len;
    const x= this.position.x + r * sin(j/len * TWO_PI)
    const y= this.position.y + r * cos(j/len * TWO_PI)
    this.circles.push(new Circle(x, y, 10, true, this.col)); 
  }
  }
  
  //function that creates a star, that is used as the flower bud
  //credit to example on official p5 website 
  createStar(x, y, radius1, radius2, npoints){
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  colorMode(HSB, 360, 100, 100);
  fill(this.starColor, 80, 70, .70); 
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  }
  
  //draws the flower with the flowerbud 
  draw(){
    colorMode(HSB, 360, 100, 100);
    fill(this.col, 100, 70, );
    for (let i=0; i<this.circles.length; i++){
      this.circles[i].show();
    }
    this.createStar(this.position.x, this.position.y, this.radius1, this.radius2, this.points); 
  }
  
  //updates the size and booleans of the flower 
  update(){
    
    //updates the individual petals 
    for (let i=0; i<this.circles.length; i++){
      
      //increase radius 
      if (this.circles[i].r < (this.ogSize*10) & this.circles[i].increase == true & this.dying == false){
      
        this.circles[i].r += 0.5
        this.radius1 += 0.04; 
        this.radius2 += 0.05;
      }
    
      //stays the same size
      else if (this.circles[i].r > (this.ogSize*10) & this.bloom > 0) {
        this.circles[i].increase = false; 
        if (i == this.circles.length - 1){
          this.bloom -= 1; 
        } 
      }
      
      //flower shrinks 
      else {
        if (i == this.circles.length - 1){
          this.dying = true;
          this.wither() 
        }
      }
    }
  }
  
  //shrinks the flower and calls to create and draw seeds 
  wither(){ 
    
    for (let i=0; i<this.circles.length; i++){
      //shrink flowers
      if (this.circles[i].r > this.ogSize * 3){
        this.circles[i].r -= 0.5; 
        this.radius1 -= 0.08; 
        this.radius2 -= 0.09;
      }
    }
    
    if (this.circles[this.circles.length - 1].r <= (this.ogSize * 3)){
      if (this.gone == false){
      this.gone = true; 
      }
      this.die();
      this.reproduce = true;  
    }
  }
  
  //flower dies and size is set to 0
  die(){

    for (let i=0; i<this.circles.length; i++){
      while (this.circles[i].r > 0){
        this.circles[i].r -= 0.5; 
        this.radius1 -= 0.08; 
      this.radius2 -= 0.09;
      }
      this.circles[i].r = 0;
      this.radius1 = 0; 
      this.radius2 = 0;
    }
    this.dissapear = true;
  }
}