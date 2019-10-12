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

function callable(fun) {
    cleanNodeCache();
    showNodeCache();
    cache_option = fun;
}

function cleanNodeCache() {
    cache_node = null;
}

function showNodeCache() {
    document.getElementById("cacheNode").innerHTML = (cache_node == null ? '' : cache_node.value);
}

function showCost() {
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
    let value = document.getElementById('newNode').value.toUpperCase();
    if (value.trim() != '') {
        addNode(value);
    }
    else {
        divMessage('e', ' You need type a name to Node.');
    }
    document.getElementById('newNode').innerHTML = '';
    document.getElementById('newNode').value = '';
}

function empty() {
    if (confirm('Are you sure you want a new project?')) {
        graph = new Graph();
        cache_node = null;
        cache_option = null;
        show_cost = false;
    }
    cache_option = null;
}

function features() {
    divMessage('w', 'We are working on this features! Thank you for using our app :)');
    cache_option = null;
}

function start() {
    if (startNode()) {
        divMessage('w', `${node.value} is the start of Graph`);
        cache_option = null;
    }
}

function end() {
    if (endNode()) {
        divMessage('w', `${node.value} is the end of Graph`);
        cache_option = null;
    }
}

function help() {
    divMessage('w', "You can read more about project <a href='https://github.com/BRSystem64/visualgraphs'/>here</a>.\n Dont forget to save your project before click in this link.");
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

function exportProject() {

    dataJson = { "nodes": {}, "edges": {} };
    let cont = 0;
    for (let aux in graph.nodes) {
        let node = graph.nodes[aux];
        dataJson["nodes"][aux] =
            {
                "value": node.value
            };
        for (let aux2 in node.edges) {
            dataJson["edges"][cont] = {
                "conex": [node.value, node.edges[aux2][0].value, node.edges[aux2][1]]
            };
            cont++;
        }
    }

    var json = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataJson));
    var a = document.createElement('a');
    console.log(json);
    a.href = 'data:' + json;
    a.download = 'vg-project.json';
    a.click();
    a.remove();
    cache_option = null;
}


function importProject() {

    cache_option = null;

    JSONReader.read((result) => {
        if (result != null) {
            setup();
            let file = null;
            file = result;
            for (let aux in file.nodes) {
                graph.addNode(file.nodes[aux].value);
            }

            for (let aux in file.edges) {
                let a = graph.getNode([file.edges[aux]['conex'][0]]);
                let b = graph.getNode([file.edges[aux]['conex'][1]]);
                a.connect(b);
                a.defineCost(b, file.edges[aux]['conex'][2]);
            }
        }
    });

}


/*
    Algorithms
*/

function bfs() {
    if (graph != null) {
        clearParentsAndVisited();
        if (graph.start == null || graph.end == null) {
            divMessage('e', 'You need define the start and the end.');
        }
        else {
            let nodes = bfsImpl(graph);
            if (!nodes[1]) {
                divMessage('e', 'Can\'t find the end.');
            } else {
                for (let i in nodes[0]) {
                    nodes[0][i].setNewColor([58, 195, 118]);
                }
            }
        }
    } else {
        divMessage('e', 'The Graph is null.');
    }
    cache_option = null;
}


function clearParentsAndVisited() {
    for (n in graph.nodes) {
        graph.nodes[n].visited = false;
        graph.nodes[n].parent = null;
    }
}

function clearColor() {
    for (n in graph.nodes) {
        graph.nodes[n].newColor = null;
    }
}


