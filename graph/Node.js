
class Node{
    constructor(value){
        this.color = color(230,100,100);

        this.value = value;
        this.edges = [];
        this.pos = createVector(random(100,innerWidth-50),random(100,innerHeight-100));
    }


    connect(...node){
        for(let n in node){
            this.edges.push(node[n]);
        }
    }

    hasConnection(node){
        return this.edges.indexOf(node) >= 0 ? true : false;
    }

    show(){
        noStroke();
        textAlign(CENTER);
        let radius = textWidth(this.value);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, radius * 2, radius * 2);
        fill(255);
        text(this.value, this.pos.x, this.pos.y);
        this.color = color(230,100,100);
    }

    showEdges(){
        stroke(120);
        for (let i = 0; i < this.edges.length; i++) {
           line(this.pos.x, this.pos.y, this.edges[i].pos.x, this.edges[i].pos.y);
        }
        
    }

    clicked(){
        let d=  dist(mouseX, mouseY, this.pos.x, this.pos.y);
        if (d <= textWidth(this.value)){
            return true;
        }
        return false;
    }

}