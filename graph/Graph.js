class Graph{
    constructor(){
        this.nodes = [];
        this.graph = {};
        this.start = null;
        this.end = null;
    }

    setStart(node){
        this.start = node;
    }

    setEnd(node){
        this.end = node;
    }

    addNode(node){
        let n = new Node(node);
        this.graph[node] = n;
        this.nodes.push(n);
        return this;
    }

    getNode(value){
        for(let n in this.nodes){
            if(this.nodes[n].value == value){
                return this.nodes[n];
            }
        }
    }

    getNodeIndex(index){
        return this.node[index];
    }

    show(showCost = false){
        if(this.nodes.length > 0){
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].showEdges();
                if(showCost){
                    this.nodes[i].showCost();
                }
            }

            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].show();
            }
        }
    }

}