
/*
 *  Control sidebar(open close)  
 */
function sidebar() {
    if (document.getElementById("sidebar").style.display == "block") {
        document.getElementById("sidebar").style.display = "none";
    } else {
        document.getElementById("sidebar").style.display = "block";
    }
}


/*
 *  Alert Function  
 */
function message(message, type){
    let m = document.createElement("div");
    m.className = ("message-box message-"+type);
    m.id = "message-box";

    let l = document.createElement("label");
    l.className = "message-box-text";
    l.textContent = message;

    m.appendChild(l);
    document.body.append(m);
    hidden(document.getElementById('message-box'), 3000);
}

function hidden(e, time){
    setTimeout(function(){
        e.style.display = "none";
    }, time);
}