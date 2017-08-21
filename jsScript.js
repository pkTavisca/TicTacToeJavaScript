var p1 = {
    name: 'Player1',
    icon: 'circle'
};
var p2 = {
    name: 'Player2',
    icon: 'cross'
};
var currentPlayer = p1;

document.getElementById("playerName").innerHTML = currentPlayer.name;

document.onclick = function(event) {
    if (event.target.localName !== "td") return;

    var cList = event.target.classList;
    if (cList.length > 0) return;

    cList.add(currentPlayer.icon);
    if (currentPlayer === p1) currentPlayer = p2;
    else if (currentPlayer === p2) currentPlayer = p1;

    document.getElementById("playerName").innerHTML = currentPlayer.name;

    console.log(cList);
}