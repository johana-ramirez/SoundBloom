/*
class for the petals of the flower
*/

const dotRadius = 3;

function Circle(x, y, r, j, col) {
  //initial setup and object variables
  this.x = x;
  this.y = y;
  this.r = r;
  this.og = r; 
  this.increase = j; 
  //color is based of the song's energy score
  this.col = col; 
  
  //creates and displays the petals 
  this.show = function(){
    colorMode(HSB,  360, 100, 100);
    fill(this.col,  30, 90); 
    ellipse(this.x, this.y, this.r * 2, this.r * 2); 
  }
}