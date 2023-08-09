let board = document.getElementById("gameBoard");
let info = document.getElementById("info");

let turn;
let tdValues = [];
let gameOverAlert;
let player1;
let player2;
let scores;

start();

function start() {
    player1 = "";
    player2 = "";
    while (player1 == null || player1.trim() == "") {
        player1 = prompt("Player 1:");
    }
    while (player2 == null || player2.trim() == "") {
        player2 = prompt("Player 2:");
    }
    scores = [0,0];
    resetBoard();
}

function displayBoard(){
    let code = "";
    for (let i = 0; i < 3; i++) {
        code += `<tr>`;
        for (let j = 0; j < 3; j++) {
            code += `<td id="c${i}${j}" onclick="setValue(${i}, ${j})"></td>`;
            tdValues[3 * i + j] = "";
        }
        code += `</tr>`;
    }
    board.innerHTML = code;
}

function display(player1, player2) {
    displayBoard();
    info.innerHTML = `<p>${player1}: <span>${scores[0]}</span></p>
                    <p>${player2}: <span>${scores[1]}</span></p>`;
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
    for (let i = 0; i < 3; i++) {
        //check vertically
        if (tdValues[i] != "" && tdValues[i] == tdValues[i + 3] && tdValues[i + 3] == tdValues[i + 6]) {
            gameOver("win");
            return;
        }
        //check horizontally
        if (tdValues[3 * i] != "" && tdValues[3 * i] == tdValues[3 * i + 1] && tdValues[3 * i + 1] == tdValues[3 * i + 2]) {
            gameOver("win");
            return;
        }
    }
    //check diagonally
    if (
        tdValues[4] != "" &&
        ((tdValues[0] == tdValues[4] && tdValues[4] == tdValues[8]) || (tdValues[2] == tdValues[4] && tdValues[4] == tdValues[6]))
    ) {
        gameOver("win");
        return;
    }
    if (!tdValues.includes("")) gameOver("draw");
}

function gameOver(status) {
    let message = "";
    
    if(turn) scores[1] += 1;
    else scores[0] += 1;

    info.innerHTML = `<p>${player1}: <span>${scores[0]}</span></p>
                    <p>${player2}: <span>${scores[1]}</span></p>`;

    if (status == "win") message = `${turn ? player2 : player1} won! Would you like to play again?`;
    else message = `It is a draw :( Would you like to play again?`;

    gameOverAlert = setTimeout(() => {
        let again = confirm(message);
        again ? resetBoard() : alert(`Results:\n${player1}:  ${scores[0]}\n${player2}:  ${scores[1]}`);
    }, 100);
}

function resetBoard(){
    clearTimeout(gameOverAlert);
    turn = true;
    tdValues = [];
    display(player1, player2);
}

document.querySelector('#restart button').addEventListener("click",f=>{
    let isSure = confirm("Are you sure to restart? You can revert this!");
    if(isSure) start()
})