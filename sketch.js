/*
    GLOBAL VARIABLES
*/

var graph;
var cache_node;
var cache_option;
var message;
var show_cost;



function setup() {
    createCanvas(innerWidth, innerHeight - 50);
    graph = new Graph();
    cache_node = null;
    cache_option = null;
    show_cost = false;
}

/*
    Loop Function.
*/
function draw() {
    background(255);
    graph.show(show_cost);
    if (cache_option != null) {
        cache_option();
    }
}



/*
    Read the option and set on cache_option, to method draw call.
*/

function callable(fun){
    cleanNodeCache();
    showNodeCache();
    cache_option = fun;
}

function cleanNodeCache(){
    cache_node = null;
}

function showNodeCache(){
    document.getElementById("cacheNode").innerHTML = (cache_node == null ? '' : cache_node.value);
}

function showCost(){
    show_cost = show_cost ? false : true;
    cache_option = null;
}




/*
    Method to accept 'enter' into input.
*/
function enterFunction(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
        add();
    }
}

/* 
    Method to add Node.
*/
function add() {
    let value = document.getElementById('newNode').value;
    if (value.trim() != '') {
        addNode(value);
    }
    else {
        divMessage('e', ' You need type a name to Node.');
    }
    document.getElementById('newNode').innerHTML = '';
    document.getElementById('newNode').value = '';
}

function empty(){
    if (confirm('Are you sure you want a new project?')) {
        graph = new Graph();
        cache_node = null;
        cache_option = null;
        show_cost = false;
    } 
    cache_option = null;
}

function features(){
    divMessage('w', 'We are working on this features! Thank you for using our app :)');
    cache_option = null;
}

function start(){
    if(startNode()){
        divMessage('w', `${node.value} is the start of Graph`);
        cache_option = null;
    }
}

function end(){
    if(endNode()){
        divMessage('w', `${node.value} is the end of Graph`);
        cache_option = null;
    }
}

function help(){
    divMessage('w', "You can read more about project <a href='https://github.com/BRSystem64/visualgraphs'/>here</a>.\n Dont forget to save your project before click in this link." );
    cache_option = null;

}




/*
    Message functions
*/

function divMessage(type, message) {

    switch (type) {
        case 'e':
            document.getElementById('title-message').innerHTML = "Error: ";
            document.getElementById('divMessage').style.background = "rgba(217, 83, 79, 0.1)";
            document.getElementById('divMessage').style.color = "#d9534f";
            break;
        case 'w':
            document.getElementById('title-message').innerHTML = "Warning: ";
            document.getElementById('divMessage').style.background = "#FEEFB3";
            document.getElementById('divMessage').style.color = "#9F6000";
            break;
    }
    document.getElementById("message").innerHTML = message;
    document.getElementById("divMessage").style.visibility = "visible";
}

function closeDiv() {
    document.getElementById("divMessage").style.visibility = "hidden";
}
