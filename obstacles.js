class Obstacle {
    constructor(x, y, size, c) {
        this.position = createVector(x, y);
        this.size = size;
        this.color = c;
    }

    //method to display the obstacle
    display() {
        push();
        translate(this.position.x, this.position.y);
        fill(this.color);
        noStroke();
        ellipse(0, 0, this.size, this.size);
        pop();
    }
}