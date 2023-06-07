class Obstacle {
    constructor(x, y, size, c) {
        this.position = createVector(x, y);
        this.size = size;
        this.color = color(255, 255, 255, 150);
    }

    //method to display the obstacle
    display() {

        push();
        translate(this.position.x, this.position.y);
        fill(this.color);
        noStroke();
        ellipse(100, 100, this.size, this.size);
        pop();
    }
}