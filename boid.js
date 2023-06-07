class Boid {
    // 1. Create a constructor function for the Boid class.
    constructor(x, y, vx, vy, c) {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.acceleration = createVector(0, 0);
        this.size = 10;
        this.color = c;
    }

    // 2. Create a function called update() that updates the position of the boid.
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    // 3. Create a function called applyForce() that adds a force to the acceleration.
    applyForce(force) {
        this.acceleration.add(force);
    }

    // 4. Create a function called seek() that steers the boid towards a target.
    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(1);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(0.1);
        this.applyForce(steer);
    }

    // method to avoid obstacles in a given array
    avoid(obstacles) {
        let desired = createVector(0, 0);
        let steer = createVector(0, 0);
        for (let i = 0; i < obstacles.length; i++) {
            let obstacle = obstacles[i];
            let d = p5.Vector.dist(this.position, obstacle.position);
            if (d < obstacle.size) {
                desired = p5.Vector.sub(this.position, obstacle.position);
                desired.setMag(1);
                steer = p5.Vector.sub(desired, this.velocity);
                steer.limit(0.1);
                this.applyForce(steer);
            }
        }
    }

    //method to display the boid
    display() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        fill(this.color);
        noStroke();
        triangle(-this.size, -this.size, this.size, 0, -this.size, this.size);
        pop();
    }





}