
function bfsImpl(graph){
    let visitedList = [];
    let sourceList = [];    
    let current = null;
    let find = false;
    visitedList.push(graph.start);
    
    while(visitedList.length != 0){
        current = visitedList[0];
        current.visited = true;
        if(current == graph.end){
            find = true;
            break;
        }
        for(let aux in current.edges){
            let flag = true;
            for(let aux2 in visitedList){
                if(visitedList[aux2] == current.edges[aux][0]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                if(!current.edges[aux][0].visited){
                    current.edges[aux][0].parent = current;
                    visitedList.push(current.edges[aux][0]);
                }
            }
        }
        visitedList.shift();
    }
    
    let wayList = [];
    while(current != null){
        wayList.push(current);
        current = current.parent;
    }
    return [wayList, find];
}






function dfsImpl(graph){
    let visitedList = [];
    let sourceList = [];    
    let current = null;
    let find = false;
    visitedList.push(graph.start);
    
    while(visitedList.length != 0){
        current = visitedList[visitedList.length - 1];
        current.visited = true;
        if(current == graph.end){
            find = true;
            break;
        }
        for(let aux in current.edges){
            let flag = true;
            for(let aux2 in visitedList){
                if(visitedList[aux2] == current.edges[aux][0]){
                    flag = false;
                    break;
                }
            }
            if(flag){
                if(!current.edges[aux][0].visited){
                    current.edges[aux][0].parent = current;
                    visitedList.push(current.edges[aux][0]);
                }
            }
        }
        visitedList.shift();
    }
    
    let wayList = [];
    while(current != null){
        wayList.push(current);
        current = current.parent;
    }
    return [wayList, find];
}