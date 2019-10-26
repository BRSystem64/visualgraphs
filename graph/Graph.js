class Graph {
    constructor() {
        this.nodes = [];
        this.start = null;
        this.end = null;
    }

    setStart(node) {
        this.start = node;
    }

    setEnd(node) {
        this.end = node;
    }

    addNode(node) {
        let n = new Node(node);
        this.nodes.push(n);
        return this;
    }

    remove(node) {
        let x = -1;
        x = this.nodes.indexOf(node);
        //this.nodes.splice(x, 1); 
        if (x != -1) {
            for (let n in this.nodes) {
                this.nodes[n].remove(node);
            }
            this.nodes.splice(x, 1);
        }
    }

    getNode(value) {
        for (let n in this.nodes) {
            if (this.nodes[n].value == value) {
                return this.nodes[n];
            }
        }
    }

    getNodeIndex(index) {
        return this.node[index];
    }

    show(showCost = false) {
        if (this.nodes.length > 0) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].showEdges();
                if (showCost) {
                    this.nodes[i].showCost();
                }
            }

            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].show();
            }
        }
    }

}