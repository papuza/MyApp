const winningComb = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

let jug1;
let jug2;
let jug1Name = Storage.get("player1").name
let jug2Name = Storage.get("player2").name
let jug1Color = Storage.get("player1").color
let jug2Color = Storage.get("player2").color
let winner;
let myTurn = Math.floor(Math.random() * 2) == 1 ? true : false;
let cells = document.querySelectorAll(".cell");
let startBtn = document.getElementById("startbtn");
startBtn.addEventListener("click", showElection);

function startGame() {
  cleanBoard();
  cells.forEach(cell => {
    cell.removeEventListener("click", makeMove);
    cell.addEventListener("click", makeMove);
    cell.setAttribute("data-full", false);
    cell.setAttribute("style", "background-color: none")
  })
  if (myTurn == false) {
    whoStarts("jug2");
  } else if (myTurn == true) {
    whoStarts("jug1")
  }
}

function cleanBoard() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].getAttribute("data-full") == jug1 || cells[i].getAttribute("data-full") == jug2) {
      cells[i].removeChild(cells[i].firstElementChild);
    }
  }
}

function makeMove(one_cell) {
  if (myTurn == true) {
    let cell = one_cell.target;
    let token = document.createElement("img");
    if (cell.getAttribute("data-full") == "false") {
      token.setAttribute("src", jug1 + ".svg");
      cell.appendChild(token);
      cell.setAttribute("data-full", jug1);
      cell.setAttribute("style", "background-color: " + jug1Color);
      if (checkWin(jug1)) {
        winner = "jug1"
        showMessage("win");
      } else if (checkDraw()) {
        showMessage("draw")
      } else {
        myTurn = false;
      }
    }
  } else {
    let cell = one_cell.target;
    let token = document.createElement("img");
    if (cell.getAttribute("data-full") == "false") {
      token.setAttribute("src", jug2 + ".svg");
      cell.appendChild(token);
      cell.setAttribute("data-full", jug2);
      cell.setAttribute("style", "background-color: " + jug2Color);
      if (checkWin(jug2)) {
        winner = "jug2"
        showMessage("win");
      } else if (checkDraw()) {
        showMessage("draw")
      } else {
        myTurn = true;
      }
    }
  }
}

// function pcMove() {
//   let celdasVacias = [];
//   celdasVacias = document.querySelectorAll(".cell[data-full=false]");
//   let i = Math.floor(Math.random() * celdasVacias.length);
//   let cell = celdasVacias[i];
//   if (cell.getAttribute("data-full") == "false") {
//     let token = document.createElement("img");
//     token.setAttribute("src", pc + ".svg");
//     cell.appendChild(token);
//     cell.setAttribute("data-full", pc);
//     if (checkWin(pc)) {
//       showMessage("lose");
//     } else if (checkDraw()) {
//       showMessage("draw")
//     } else {
//       myTurn = true;
//     }
//   }
// }

function checkDraw() {
  if (document.querySelectorAll(".cell[data-full=false]").length == 0) {
    return true;
  }
}

function checkWin(simbol) {
  return winningComb.some(one_comb => {
    return one_comb.every(index => {
      if (cells[index].dataset.full == simbol) {
        return true;
      }
    });
  });
}


function showMessage(type) {
  let msjDiv = document.getElementById("msjDiv");
  let msj = document.getElementById("msj");
  let startBtn = document.getElementById("startbtn");
  startBtn.innerHTML = "Play Again"
  if (type == "win") {
    msj.innerHTML = winner == "jug1" ? "Ganó " + jug1Name : "Ganó " + jug2Name;
    sumPoints(winner == "jug1" ? "jug1" : "jug2");
  } else if (type == "draw") {
    msj.innerHTML = "Empate!"
  }
  msjDiv.style.display = "flex";
}

function whoStarts(who) {
  let whoStarts = document.getElementById("whoStarts");
  let whoStartsTxt = document.getElementById("whoStartsTxt");
  whoStarts.style.visibility = "visible"
  if (who == "jug2") {
    whoStartsTxt.innerHTML = "Empieza " + jug2Name
  } else if (who == "jug1") {
    whoStartsTxt.innerHTML = "Empieza " + jug1Name
  }
}

function showElection() {
  let msjDiv = document.getElementById("msjDiv");
  msjDiv.style.display = "none"
  let electionMsj = document.getElementById("election");
  let crossBtn = document.getElementById("cross");
  let circleBtn = document.getElementById("circle");
  electionMsj.style.display = "flex";
  crossBtn.addEventListener("click", () => {
    jug1 = "cross";
    jug2 = "circle";
    electionMsj.style.display = "none";
    startGame();
  })

  circleBtn.addEventListener("click", () => {
    jug1 = "circle";
    jug2 = "cross";
    electionMsj.style.display = "none";
    startGame();
  })
}

function sumPoints(player) {
  let thePlayer = Storage.get(player == "jug1" ? "player1" : "player2");
  let actualPoints = parseInt(thePlayer.tatetiPoints);
  thePlayer.tatetiPoints = actualPoints + 10;
  thePlayer.totalPoints = thePlayer.generalaPoints + thePlayer.tatetiPoints;
  Storage.put(player == "jug1" ? "player1" : "player2", thePlayer);
}