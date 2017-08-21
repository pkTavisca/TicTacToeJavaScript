var p1 = {
    name: 'Player1',
    icon: 'circle',
    playerNo: 1
};
var p2 = {
    name: 'Player2',
    icon: 'cross',
    playerNo: 2
};
var currentPlayer = p1;
setIdForAllTd();
var currentMapArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var hasWon = false;
document.getElementById("playerName").innerHTML = currentPlayer.name;
document.getElementById("playAgainButton").addEventListener("click", resetPage);

document.onclick = function(event) {
    if (hasWon) return;
    if (event.target.localName !== "td") return;

    var cList = event.target.classList;
    if (cList.length > 0) return;

    setIcon(cList);
    updateCurrentMapArray(event.target);

    if (playerHasWon()) {
        onPlayerWin();
        return;
    }

    if (currentPlayer === p1) currentPlayer = p2;
    else if (currentPlayer === p2) currentPlayer = p1;

    document.getElementById("playerName").innerHTML = currentPlayer.name;
}

function onPlayerWin() {
    document.getElementById("currentTurn").style.display = "none";
    document.getElementById("resultMessage").innerHTML = currentPlayer.name + " has Won!";
    document.getElementById("resultMessage").style.display = "block";
    document.getElementById("playAgainArticle").style.display = "block";
    hasWon = true;
}

function playerHasWon() {
    var n = currentPlayer.playerNo;
    var map = currentMapArray;
    for (var i = 0; i < map.length; i++) {
        if (map[i][0] === map[i][1] && map[i][0] === map[i][2] && map[i][0] !== 0) return true;
        if (map[0][i] === map[1][i] && map[0][i] === map[2][i] && map[0][i] !== 0) return true;
    }
    if (map[0][0] === map[1][1] && map[0][0] === map[2][2] && map[0][0] !== 0) return true;
    if (map[0][2] === map[1][1] && map[0][2] === map[2][0] && map[0][2] !== 0) return true;
}

function setIdForAllTd() {
    var elementArr = document.getElementsByTagName("td");
    for (var i = 0; i < elementArr.length; i++) {
        elementArr[i].id = i;
    }
}

function setIcon(cList) {
    cList.add(currentPlayer.icon);
}

function updateCurrentMapArray(target) {
    var idNo = parseInt(target.id);
    var row = parseInt(idNo / 3);
    var column = idNo % 3;
    currentMapArray[row][column] = currentPlayer.playerNo;
}

function resetPage() {
    currentMapArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    currentPlayer = p1;
    hasWon = false;
    document.getElementById("playerName").innerHTML = currentPlayer.name;
    document.getElementById("currentTurn").style.display = "block";
    document.getElementById("resultMessage").style.display = "none";
    document.getElementById("playAgainArticle").style.display = "none";
    var elementArr = document.getElementsByTagName("td");
    for (var i = 0; i < elementArr.length; i++) {
        elementArr[i].className = '';
    }
}