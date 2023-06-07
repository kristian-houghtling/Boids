let boids = [];
let obstacles = [];
let numBoids = 100;
let numObstacles = 10;
let alignWeight = 1;
let cohesionWeight = 1;
let separationWeight = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(30);

  for (let i = 0; i < numBoids; i++) {
    let x = random(width);
    let y = random(height);
    let vx = random(-1, 1);
    let vy = random(-1, 1);
    let c = color(random(255), random(255), random(255));
    boids.push(new Boid(x, y, vx, vy, c));
  }

  for (let i = 0; i < numObstacles; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 50);
    let c = color(255, 100, 100);
    obstacles.push(new Obstacle(x, y, size, c));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < boids.length; i++) {
    let boid = boids[i];
    let align = createVector(0, 0);
    let cohesion = createVector(0, 0);
    let separation = createVector(0, 0);
    let count = 0;
    for (let j = 0; j < boids.length; j++) {
      if (i != j) {
        let other = boids[j];
        let distance = p5.Vector.dist(boid.position, other.position);
        if (distance < 50) {
          align.add(other.velocity);
          cohesion.add(other.position);
          let separate = p5.Vector.sub(boid.position, other.position);
          separate.normalize();
          separate.mult(1 / distance);
          separation.add(separate);
          count++;
        }
      }
    }
    if (count > 0) {
      align.div(count);
      align.normalize();
      align.mult(alignWeight);
      cohesion.div(count);
      cohesion.sub(boid.position);
      cohesion.setMag(5);
      cohesion.mult(cohesionWeight);
      separation.div(count);
      separation.setMag(5);
      separation.mult(separationWeight);
    }
    let mouse = createVector(mouseX, mouseY);
    let seek = boid.seek(mouse);
    let avoid = boid.avoid(obstacles);
    boid.applyForce(align);
    boid.applyForce(cohesion);
    boid.applyForce(separation);
    boid.applyForce(seek);
    boid.applyForce(avoid);
    boid.update();
    boid.display();
  }
  for (let obstacle of obstacles) {
    obstacle.display();
  }


}
