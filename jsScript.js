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
var draw = false;
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
    if (!draw)
        document.getElementById("resultMessage").innerHTML = currentPlayer.name + " has Won!";
    else
        document.getElementById("resultMessage").innerHTML = "The match is a draw!";
    document.getElementById("resultMessage").style.display = "block";
    document.getElementById("playAgainArticle").style.display = "block";
    hasWon = true;
}

function playerHasWon() {
    var n = currentPlayer.playerNo;
    var map = currentMapArray;
    for (var i = 0; i < map.length; i++) {
        if (map[i][0] === map[i][1] && map[i][0] === map[i][2] && map[i][0] !== 0) {
            var stroke = document.getElementById("redStroke").style;
            stroke.display = "block";
            stroke.top = i * 7 + 3.5 - 0.25 + "em";
            stroke.left = "3em";
            stroke.width = "16em";
            stroke.height = "1em";
            return true;
        }
        if (map[0][i] === map[1][i] && map[0][i] === map[2][i] && map[0][i] !== 0) {
            var stroke = document.getElementById("redStroke").style;
            stroke.display = "block";
            stroke.top = "3em"; // 
            stroke.left = i * 7 + 3.5 - 0.25 + "em";
            stroke.width = "1em";
            stroke.height = "16em";
            return true;
        }
    }
    if (map[0][0] === map[1][1] && map[0][0] === map[2][2] && map[0][0] !== 0) {
        var stroke = document.getElementById("redStroke").style;
        stroke.display = "block";
        stroke.top = "2.5em"; // 
        stroke.left = "3em";
        stroke.width = "23em";
        stroke.height = "1em";
        stroke.transform = "rotate(45deg)";
        stroke["transform-origin"] = "top left";
        return true;
    }
    if (map[0][2] === map[1][1] && map[0][2] === map[2][0] && map[0][2] !== 0) {
        var stroke = document.getElementById("redStroke").style;
        stroke.display = "block";
        stroke.top = "3em"; // 
        stroke.left = "19.5em";
        stroke.width = "23em";
        stroke.height = "1em";
        stroke.transform = "rotate(135deg)";
        stroke["transform-origin"] = "top left";
        return true;
    }

    draw = true;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] === 0) {
                draw = false;
                break;
            }
        }
    }
    if (draw) return true;
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
    document.getElementById("redStroke").style.display = "none";
    document.getElementById("redStroke").style.transform = "rotate(0deg)";
}