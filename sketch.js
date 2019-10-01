var graph;
var cache_node;

function setup(){
    createCanvas(innerWidth,innerHeight-90);
    graph = new Graph();
    cache_node = null;
    
    //  graph.addNode('Me');
    //  graph.addNode('Alex');
    //  graph.addNode('John');
    //  graph.addNode('Alice');
    //  graph.addNode('Michael');
    //  graph.addNode('Peter');
    //  graph.addNode('Luna');

    //  graph.getNode('Me').connect(graph.getNode('Alex'));
    //  graph.getNode('Me').connect(graph.getNode('Peter'));
    //  graph.getNode('Alex').connect(graph.getNode('John'));
    //  graph.getNode('Alex').connect(graph.getNode('Alice'));
    //  graph.getNode('Alice').connect(graph.getNode('Michael'));
    //  graph.getNode('Luna').connect(graph.getNode('Me'));

    // graph.setStart(graph.getNode('Me'));
    // graph.setEnd(graph.getNode('Michael'));

}


function draw(){
    background(255);
    graph.show();
    mousePressed();
}

function mousePressed(){
    if(mouseIsPressed && mouseButton == LEFT){
        if(cache_node == null){
            for(let n in graph.nodes){
                if(graph.nodes[n].clicked()){
                    cache_node = graph.nodes[n];
                }
            }
        }else{
            cache_node.color = (70,70,70);
            cache_node.pos.x = mouseX;
            cache_node.pos.y = mouseY;
        }
    }else{
        cache_node = null;
    }
}

function doubleClicked(){
    selected  = document.getElementById('selected');
    node = null;
    for(let n in graph.nodes){
        if(graph.nodes[n].clicked()){
            node =graph.nodes[n];
            break;
        }
    }
    if(selected.value == undefined || selected.value == '' || selected.value == null || node.hasConnection(selected.value) || node.value == selected.value){
        showSelected(node.value);
    }else{
        node.connect(graph.getNode(selected.value));
        showSelected('');
    }
}


function add(){
    let value = document.getElementById('newName').value;
    if(value.trim() != ''){
        graph.addNode(value);
    }   
    else{
        alert('Please type a correct name. You can\'t  let this value null.');
    }
    document.getElementById('newName').innerHTML = '';
    document.getElementById('newName').value = '';
}

function showSelected(value){
    document.getElementById('selected').innerHTML = value;
    document.getElementById('selected').value = value;
}



