
class Node {
    constructor(value) {
        this.visited = false;
        this.parent = null;
        this.color = (31, 141, 214);
        this.newColor = null;
        this.value = value;
        this.edges = [];
        this.pos = createVector(random(100, innerWidth - 50), random(100, innerHeight - 100));
    }

    setNewColor(a){
        this.newColor = a; 
    }

    connect(node) {
        let a = [node, 0];
        this.edges.push(a);
    }


    hasConnection(node) {
        for(let n in this.edges){
            if(node == this.edges[n][0]){
                return true;
            }
        }
        return false;
    }

    defineCost(node, cost){
        for(let n in this.edges){
            if(node == this.edges[n][0]){
                this.edges[n][1] = cost;
                break
            }
        }
    }


    show() {
        noStroke();
        textSize(16);
        textAlign(CENTER);
        let radius = textWidth(this.value);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, radius * 1.2, radius * 1.2);
        fill(255);
        text(this.value, this.pos.x, this.pos.y);
        this.color = color(this.newColor == null ? [31, 141, 214] : this.newColor);

    }

    showEdges() {
        stroke(120);
        for (let i = 0; i < this.edges.length; i++) {
            line(this.pos.x, this.pos.y, this.edges[i][0].pos.x, this.edges[i][0].pos.y);
        }
    }


    showCost() {
        let a = 0;
        let b = 0;
        stroke(120);
        for (let i = 0; i < this.edges.length; i++) {

            if (this.pos.x < this.edges[i][0].pos.x) {
                a = this.pos.x;
            } else {
                a = this.edges[i][0].pos.x;
            }

            if (this.pos.y < this.edges[i][0].pos.y) {
                b = this.pos.y;
            }
            else {
                b = this.edges[i][0].pos.y;
            }
            fill(46);
            text(this.edges[i][1], a + Math.abs(this.pos.x - this.edges[i][0].pos.x) / 2,
                b + Math.abs(this.pos.y - this.edges[i][0].pos.y) / 2 - 10);
        }
    }

    clicked() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        if (d <= textWidth(this.value)) {
            return true;
        }
        return false;
    }

}