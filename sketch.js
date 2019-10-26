/*****************
    GLOBAL VARIABLES
*****************/
var graph;
var cache_node;
var cache_option;
var message;
var show_cost;

/*****************
    Principal functions (Setup, draw, callable)
*****************/
function setup() {
    createCanvas(innerWidth, innerHeight - 100);
    graph = new Graph();
    cache_node = null;
    cache_option = null;
    show_cost = false;
}

function draw() {
    background(255);
    graph.show(show_cost);
    if (cache_option != null) {
        cache_option();
    } else {
        cache_option = move;
    }
}

function callable(func) {
    cleanNodeCache();
    showNodeCache();
    cache_option = func;
}


/*****************
  Tools of Graphs (move, start, end, cost, connection, remove)
*****************/

function move() {
    if (hasMouseClicked()) {
        if (cache_node == null) {
            cache_node = getNode();
        }
        if (cache_node != null) {
            cache_node.color = (70, 70, 70);
            cache_node.pos.x = mouseX;
            cache_node.pos.y = mouseY;
            return;
        }
    }
    cache_node = null;
}

function removeNode() {
    if (hasMouseClicked()) {
        cache_node = getNode();
        if (cache_node != null) {
            graph.remove(cache_node);
            cache_node = null;
            cache_option = null;
        }
    }
}

function showCost() {
    show_cost = show_cost ? false : true;
    cache_option = null;
}

function add() {
    let value = document.getElementById('new-node').value.toUpperCase();
    if (value.trim() != '') {
        graph.addNode(value);
    }
    else {
       message('You need type a name to new node.', 'danger');
    }
    document.getElementById('new-node').innerHTML = '';
    document.getElementById('new-node').value = '';
}

function uniConnection() {
    return connection(0);
}

function biConnection() {
    return connection(1);
}

function connection(type) {
    if (hasMouseClicked()) {
        node = getNode();
        if (cache_node == null) {
            cache_node = node;
        }
        else if (node != null && cache_node.hasConnection(node)) {
            message(`${cache_node.value} already have connection with ${node.value}`, 'warning');
        }
        else if (node != null && node.hasConnection(cache_node)) {
            message(`${node.value} already have connection with ${cache_node.value}`, 'warning');
        }
        else if (cache_node != node && cache_node != null && node != null) {
            if (type == 0) {
                cache_node.connect(node);
            }
            if (type == 1) {
                node.connect(cache_node);
                cache_node.connect(node);
            }
            cleanNodeCache();
        }
        showNodeCache();
    }
}

function cost() {
    if (hasMouseClicked()) {
        node = getNode();
        if (cache_node == null) {
            cache_node = node;
        } else if (node != null && cache_node != node) {
            if (!cache_node.hasConnection(node)) {
                message(`${cache_node.value} dont have connection with ${node.value}`, 'warning');
            }
            else {
                c = parseInt(window.prompt('Define the cost'));
                if (Number.isInteger(c) && c > 0) {
                    cache_node.defineCost(node, c);
                    if (node.hasConnection(cache_node)) {
                        node.defineCost(cache_node, c);
                    }
                }
                else {
                    message('Only number bigger zero is possible', 'warning');
                }
                cleanNodeCache();
            }
        }
        showNodeCache();
    }
    mouseButton = RIGHT;
}

function start() {
    if (hasMouseClicked()) {
        node = getNode();
        if (node != null) {
            graph.setStart(node);
            message(`Start of Graph: ${node.value}`, 'success');
            cache_option = null;
        }
    }

}

function end() {
    if (hasMouseClicked()) {
        node = getNode();
        if (node != null) {
            graph.setEnd(node);
            message(`End of Graph: ${node.value}`, 'success');
            cache_option = null;
        }
    }
}

/*****************
  Algorithms operations
*****************/
function dfs() {
    executeAlgorithm(dfsImpl);
    cache_option = null;
}

function bfs() {
    executeAlgorithm(bfsImpl);
    cache_option = null;
}

function executeAlgorithm(alg) {
    if (graph != null) {
        clearParentsAndVisited();
        if (graph.start == null || graph.end == null) {
            message('You need define the start and the end.', 'warning');
        }
        else {
            let nodes = alg(graph);
            if (!nodes[1]) {
                message('Cant find the end.', 'danger');
            } else {
                for (let i in nodes[0]) {
                    nodes[0][i].setNewColor([58, 195, 118]);
                }
            }
        }
    } else {
        message('Cant find the end.', 'warning');
    }
}

/*****************
  Project operations (new, export, import)
*****************/

function empty() {
    if (confirm('Are you sure you want a new project?')) {
        setup();
    }
    cache_option = null;
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

/*****************
  Auxiliar functions
*****************/
function cleanNodeCache() {
    cache_node = null;
}

function showNodeCache() {
    document.getElementById("cache-text").innerHTML = "Cache: " + (cache_node == null ? '' : cache_node.value);
}

function clearParentsAndVisited() {
    for (n in graph.nodes) {
        graph.nodes[n].visited = false;
        graph.nodes[n].parent = null;
        graph.nodes[n].setNewColor(null);

    }
}

function enterFunction(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
        add();
    }
}

function getNode() {
    for (let n in graph.nodes) {
        if (graph.nodes[n].clicked()) {
            return graph.nodes[n];
            break;
        }
    }
    return null;
}

function hasMouseClicked() {
    if (mouseIsPressed && mouseButton == LEFT) {
        return true;
    }
    return false;
}

