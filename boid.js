// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
// https://editor.p5js.org/codingtrain/sketches/ry4XZ8OkN

//init 1.5 1 2 
// 1.5  3  2 
let alignmentValue = 1.5
let cohesionValue = 1.5 // was 1 
let separationValue = 2.5 // was 2 

class Boid {
  constructor(p) {
    this.position = p.createVector(p.random(p.width), p.random(p.height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(p.random(2, 5));  // was 2, 4
    this.acceleration = p.createVector();
    this.maxForce = 0.2; //was 0.2 was 1
    this.maxSpeed = 6; //was 5  was 4
    this.p = p 
  }

  edges() {
    if (this.position.x > this.p.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.p.width;
    }
    if (this.position.y > this.p.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.p.height;
    }
  }

  align(boids) {
    let perceptionRadius = 25; // was 50
   // let perceptionRadius = this.p.random(50, 100)
    
    let steering = this.p.createVector();
    //let steering = this.p.createVector(p.mouseX, p.mouseY)

    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

   // console.log("STEERING: ", steering)

    return steering;
  }

  separation(boids) {
    let perceptionRadius = 24; //was 24  was 50 
//   let perceptionRadius = this.p.random(100, 200)
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    
    let perceptionRadius = 40; //was 50 was 100 
    //let perceptionRadius = this.p.random(50, 150)

    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }




  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(alignmentValue);
    cohesion.mult(cohesionValue);
    separation.mult(separationValue);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  move_to_mouse( position) {

    var bipc = this.p.createVector(this.p.mouseX, this.p.mouseY);
    var v = bipc.sub(position)
    //v.div(1000); // was 100,  500 is good 
    v.div(this.p.random(4000, 5000)) //the greater the better for subtlety.
   // v.div(this.p.random(100, 20000))
    return v;
  }

  update() {
    this.position.add(this.velocity);

    this.position.add(this.move_to_mouse(this.position))
    this.position.add(this.move_to_mouse(this.position))
    this.position.add(this.move_to_mouse(this.position))
    //this.position.add(this.move_to_mouse(this.position))

    this.velocity.add(this.acceleration);

    this.velocity.add(this.move_to_mouse(this.position))
    

    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    this.p.strokeWeight(6);
   //this.p.strokeWeight(this.p.random(3,10)) 
   
   this.p.stroke(220);
   // this.p.stroke(this.p.random(200, 255))

    this.p.point(this.position.x, this.position.y);
  }
}
