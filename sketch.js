var graph;


function setup(){
    createCanvas(innerWidth,innerHeight-90);
    graph = new Graph();
    
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
        for(let n in graph.nodes){
            if(graph.nodes[n].clicked()){
                    graph.nodes[n].color = (70,70,70);
                    graph.nodes[n].pos.x = mouseX;
                    graph.nodes[n].pos.y = mouseY;
            }
        }
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



