let board = document.getElementById("gameBoard");
let info = document.getElementById("info");

let turn;
let tdValues;
let gameOverAlert;
let player1;
let player2;

start();

function start() {
    clearTimeout(gameOverAlert);
    while (player1 == null || player1.trim() == "") {
        player1 = prompt("Player1:");
    }
    while (player2 == null || player2.trim() == "") {
        player2 = prompt("Player2:");
    }
    turn = true;
    tdValues = [[], [], []];
    display(player1,player2);
}

function display(player1, player2) {
    let code = "";
    for (let i = 0; i < 3; i++) {
        code += `<tr>`;
        for (let j = 0; j < 3; j++) {
            code += `<td id="c${i}${j}" onclick="setValue(${i}, ${j})"></td>`;
            tdValues[3 * i + j] = undefined;
        }
        code += `</tr>`;
    }
    board.innerHTML = code;
    info.innerHTML=`Player1: <span>${player1}</span><br/>
                    Player2: <span>${player2}</span>`;
}

function setValue(i, j) {
    let td = document.getElementById(`c${i}${j}`);
    if (td.innerHTML == "") {
        td.innerHTML = turn ? "x" : "o";
        tdValues[3 * i + j] = turn ? "x" : "o";
        turn = !turn;
        check();
    }
}

function check() {
    if (!tdValues.includes(undefined)) gameOver("draw");
    for (let i = 0; i < 3; i++) {
        //check vertically
        if (tdValues[i] != undefined && tdValues[i] == tdValues[i + 3] && tdValues[i + 3] == tdValues[i + 6]) {
            gameOver("win");
            return;
        }
        //check horizontally
        if (
            tdValues[3 * i] != undefined &&
            tdValues[3 * i] == tdValues[3 * i + 1] &&
            tdValues[3 * i + 1] == tdValues[3 * i + 2]
        ) {
            gameOver("win");
            return;
        }
    }
    //check diagonally
    if (
        tdValues[4] != undefined &&
        ((tdValues[0] == tdValues[4] && tdValues[4] == tdValues[8]) ||
            (tdValues[2] == tdValues[4] && tdValues[4] == tdValues[6]))
    ) {
        gameOver("win");
        return;
    }
}

function gameOver(status) {
    let message = "";

    if (status == "win") message = `${turn ? player2 : player1} won! Would you like to play again?`;
    else message = `It is a draw :( Would you like to play again?`;

    gameOverAlert = setTimeout(() => {
        let again = confirm(message);
        again ? start() : alert("Goodbye for now!");
    }, 100);
}
