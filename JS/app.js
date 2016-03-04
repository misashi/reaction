gamelength = 20;
timerID = null
var playing = false;
var numholes = 6 * 10;
var currentpos = -1;
var score = 0;

function clearholes() {
    for (var k = 0; k < document.reaction.elements.length; k++) document.reaction
        .elements[k].checked = false;
}

function random() {
    return (Math.floor(Math.random() * 100 % numholes));
}

function stoptimer() {
    if (playing) clearTimeout(timerID);
}

function showtime(remtime) {
    document.menu.timeleft.value = remtime;
    if (playing) {
        if (remtime == 0) {
            stopgame();
            return;
        } else {
            temp = remtime - 1;
            timerID = setTimeout("showtime(temp)", 1000);
        }
    }
}

function stopgame() {
    stoptimer();
    playing = false;
    document.menu.timeleft.value = 0;
    clearholes();
    display("Game Over");
    alert('Game Over.\nYour score is:  ' + score);
}

function play() {
    stoptimer();
    if (playing) {
        stopgame();
        return;
    }
    playing = true;
    clearholes();
    document.menu.score.value = score;
    display("Playing");
    launch();
    showtime(gamelength);
}

function display(msg) {
    document.menu.state.value = msg;
}

function launch() {
    var launched = false;
    while (!launched) {
        mynum = random();
        if (mynum != currentpos) {
            document.reaction.elements[mynum].checked = true;
            currentpos = mynum;
            launched = true;
        }
    }
}

function hithead(id) {
    if (playing == false) {
        clearholes();
        display("Push Start to Play");
        return;
    }
    if (currentpos != id) {
        score += -1;
        document.menu.score.value = score;
        document.reaction.elements[id].checked = false;
    } else {
        score += 1;
        document.menu.score.value = score;
        launch();
        document.reaction.elements[id].checked = false;
    }
}
