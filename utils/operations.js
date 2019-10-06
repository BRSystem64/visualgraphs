/*
    Moving a node
*/

function move() {
    if (hasMouseClicked()) {
        if (cache_node == null) {
            for (let n in graph.nodes) {
                if (graph.nodes[n].clicked()) {
                    cache_node = graph.nodes[n];
                }
            }
        }
        if (cache_node != null) {
            cache_node.color = (70, 70, 70);
            cache_node.pos.x = mouseX;
            cache_node.pos.y = mouseY;
        }
    } else {
        cache_node = null;
    }
}

/*
    Add node
 */
function addNode(value) {
    graph.addNode(value);
}

/*
    start Node
*/

function startNode() {
    if (hasMouseClicked()) {
        node = getNode();
        if (node != null) {
            graph.setStart(node);
            return true;
        }
    }
    return false;
}

function endNode() {
    if (hasMouseClicked()) {
        node = getNode();
        if (node != null) {
            graph.setEnd(node);
            return true;
        }
    }
    return false;
}

/*
    Connection Methods
*/
function uniConnection() {
    connection(0);
}

function biConnection() {
    connection(1);
}

function connection(type) {
    if (hasMouseClicked()) {
        node = getNode();
        if (cache_node == null) {
            cache_node = node;
        }
        else if (cache_node.hasConnection(node)) {
            divMessage('w', `${cache_node.value} already have connection with ${node.value}`);
        } else if (node != null && node.hasConnection(cache_node)) {
            divMessage('w', `${node.value} already have connection with ${cache_node.value}`);
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


/*
    Cost Method
*/
function cost() {
    if (hasMouseClicked()) {
        node = getNode();

        if (cache_node == null) {
            cache_node = node;
        } else if (cache_node != null && node != null && cache_node != node) {
            if (!cache_node.hasConnection(node)) {
                divMessage('e', `${cache_node.value} dont have connection with ${node.value}`);

            }
            else {
                c = parseInt(window.prompt('Define the cost'));
                if (Number.isInteger(c)) {
                    cache_node.defineCost(node, c);
                    if (node.hasConnection(cache_node)) {
                        node.defineCost(cache_node, c);
                    }
                }
                else {
                    divMessage('e', 'Only number is valid.');
                }
                cleanNodeCache();
            }
        }
        showNodeCache();
    }
    mouseButton = RIGHT;
}




/*
    get node
*/
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