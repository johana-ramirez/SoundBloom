/*
Class for the seed system for every flower. It includes a particle system. 
*/
class seedSystem{
  
  constructor(seeds, size, x, y, col, len, points, starColor){ 
    //physical traits 
    this.seeds = seeds;
    this.size = size;
    this.position = createVector(x, y); 
    this.col = col; 
    this.len = len;
    this.points = points; 
    this.starColor = starColor;
    //creates the particle system
    this.system = new ParticleSystem(this.position.x, this.position.y, this.seeds,                            this.size, this.col, this.len, this.points, this.starColor);  
   }
  //draws and updates the particle system 
  create(){ 
    this.system.update();
    this.system.draw();
  }
}


/*
Class for the particle system. A particle represent a seed. 
*/
class ParticleSystem {
  particles = [];
  forces = [];

  constructor(x, y, seeds, seedSize, col, len, points, starColor) {
    //visual traits for flower
    this.position = createVector(x, y);
    this.seeds = seeds; 
    this.seedSize = seedSize; 
    this.col = col; 
    this.len = len; 
    this.points = points; 
    this.starColor = starColor; 
  }

  addForce(force) {
    this.forces.push(force);
  }

  applyAttractor(a) {
        for (let p of this.particles) {
            this.force = a.applyTo(p);
            p.applyForce(this.force);
        }
    }

  update() {
    if(this.particles.length < this.seeds){
        for(let i=0; i<this.seeds; i++){
          let par = new Particle(this.seedSize, this.position, this.col, this.len,                                      this.points, this.starColor);
          this.particles.push(par);
          par.position.x = this.position.x;
          par.position.y = this.position.y;
          //force pushes seeds out of flower 
          const angle = random(0, 295);
          const f = p5.Vector.fromAngle(radians(angle), random(0.5,0.8));
          par.applyForce(f);
        }
      }

    for (let force of this.forces) {
      for (let p of this.particles) {
        if (p.flower == false){
          force.applyTo(p);
        }
      }
    }

    for (let p of this.particles) {
      if (p.flower == false){
        p.update();
      }
    }
    }

  draw() {
    for (let p of this.particles) {
      if (p.flower == false){
        p.draw();
      }
    }
  }
}

/*
Particle object represents a seed. It is represented as a small circle. 
*/
class Particle {
  constructor(size, origin, col, len, points, starColor) {
    //physical traits
    this.position = createVector(0,0);
    this.velocity = createVector(0, 0);
    this.force = createVector(0, 0);
    this.ogSize = size; 
    this.size = size; 
    this.origin = origin;
    this.col = col; 
    this.len = len; 
    this.points = points; 
    this.starColor = starColor; 
    //how long should the seed be able to move for
    this.move = random(100, 200);
    //how long it takes for a seed to be planted
    this.planting = random(150, 300); 
    //if the seed is planted and will start growing
    this.planted = false; 
    //if the seed became a flower 
    this.flower = false; 
  }

  applyForce(force) {
    this.force.add(force);
  }

  update() {
    
    //wrap for seeds 
    if (this.position.x > width){
      this.position.x = 0; 
    }
    else if (this.position.x < 0){
      this.position.x = width; 
    }
    if (this.position.y > height - 50){
      this.position.y = 0; 
    }
    else if (this.position.y < 0){
      this.position.x = height - 50; 
    }
    
    this.velocity.add(this.force);
    //start planting the seed and the seed slowly grows
    if (this.move <= 0 && this.planting > 0 && this.planted == false){
      this.velocity = createVector(0, 0);
      this.planting -= 1
      if (this.planting <= 0){
        this.planted = true; 
      }
    }
    //the seed is planted and it will become a flower 
    else if (this.move <= 0 && this.planted == true && this.flower == false){
      this.velocity = createVector(0, 0);
      this.size = 0; 
      let newSize = random(0.5, 2); 
      let newFlower = new Flower(this.col, newSize, this.position.x, this.position.y,                                  this.len, this.points, this.starColor);
      newFlower.createCircles();
      flowers.push(newFlower); 
      this.flower = true;
    }
    
    this.position.add(this.velocity);

    this.force.x = 0;
    this.force.y = 0;
    this.move -= 1; 
  }
  
  //draws the seed
  draw(){
    fill(this.col);
    circle(this.position.x, this.position.y, this.size);
  }
}

/*
Class for the attractor. Mimics wind for the seeds. 
*/
class Attractor {
  constructor(strength) {
    this.strength = strength; 
    this.position = createVector(0,0);
  }
  
  //apply force to particle
  applyTo(particle){  
  let G = this.strength 
  let v = new p5.Vector.sub(this.position, particle.position); 
  let v_sq = v.magSq(); 
  v.normalize(); 
  v_sq = constrain(v_sq, 25, width); 
  let magnitude = G/(v_sq); 
  return v.mult(magnitude);
  }
}


