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
$("#playerName").html(currentPlayer.name);
$("#playAgainButton").click(resetPage);

$(document).click(function (event) {
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

    $("#playerName").html(currentPlayer.name);
});

function onPlayerWin() {
    $("#currentTurn").css("display", "none");
    if (!draw)
        $("#resultMessage").html(currentPlayer.name + " has Won!");
    else
        $("#resultMessage").html("The match is a draw!");
    $("#resultMessage").css("display", "block");
    $("#playAgainArticle").css("display", "block");
    hasWon = true;
}

function playerHasWon() {
    var n = currentPlayer.playerNo;
    var map = currentMapArray;
    for (var i = 0; i < map.length; i++) {
        if (map[i][0] === map[i][1] && map[i][0] === map[i][2] && map[i][0] !== 0) {
            $("#redStroke").css("display", "block");
            $("#redStroke").css("top", i * 7 + 3.5 - 0.25 + "em");
            $("#redStroke").css("left", "3em");
            $("#redStroke").css("width", "16em");
            $("#redStroke").css("height", "1em");
            return true;
        }
        if (map[0][i] === map[1][i] && map[0][i] === map[2][i] && map[0][i] !== 0) {
            $("#redStroke").css("display", "block");
            $("#redStroke").css("top", "3em");
            $("#redStroke").css("left", i * 7 + 3.5 - 0.25 + "em");
            $("#redStroke").css("width", "1em");
            $("#redStroke").css("height", "16em");
            return true;
        }
    }
    if (map[0][0] === map[1][1] && map[0][0] === map[2][2] && map[0][0] !== 0) {
        $("#redStroke").css("display", "block");
        $("#redStroke").css("top", "2.5em");
        $("#redStroke").css("left", "3em");
        $("#redStroke").css("width", "23em");
        $("#redStroke").css("height", "1em");
        $("#redStroke").css("transform", "rotate(45deg)");
        $("#redStroke").css("transform-origin", "top left");
        return true;
    }
    if (map[0][2] === map[1][1] && map[0][2] === map[2][0] && map[0][2] !== 0) {
        $("#redStroke").css("display", "block");
        $("#redStroke").css("top", "3em");
        $("#redStroke").css("left", "19.5em");
        $("#redStroke").css("width", "23em");
        $("#redStroke").css("height", "1em");
        $("#redStroke").css("transform", "rotate(135deg)");
        $("#redStroke").css("transform-origin", "top left");
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
    var elementArr = $("td");
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
    $("#playerName").html(currentPlayer.name);
    $("#currentTurn").css("display", "block");
    $("#resultMessage").css("display", "none");
    $("#playAgainArticle").css("display", "none");
    var elementArr = $("td");
    for (var i = 0; i < elementArr.length; i++) {
        elementArr[i].className = '';
    }
    $("#redStroke").css("display", "none");
    $("#redStroke").css("transform", "rotate(0deg)");
}
