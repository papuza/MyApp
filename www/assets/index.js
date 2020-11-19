var app = {
  cantPlayers: 0,
  players: []
}

var player = {
  name,
  img: "",
  color: "",
  generalaPoints: 0,
  tatetiPoints: 0,
  juego3Points: 0,
  totalPoints: 0
}

function getName() {
  let name = document.getElementById("name-player");
  let newName = prompt("Ingrese nombre del jugador");
  player.name = newName;
  name.innerHTML = newName;
}

function getColor() {
  let menu = document.getElementById("main-menu");
  let newColor = document.getElementById("favcolor").value;
  menu.style.backgroundColor = newColor;
  player.color = newColor;
}

function pushPlayer() {
  if (Storage.get("appstate").cantPlayers < 3) {
    if (Storage.get("appstate") != null) {
      let appstate = Storage.get("appstate");
      appstate.cantPlayers++;
      appstate.players.push(player);
      Storage.put("appstate", appstate);
      Storage.put("player" + appstate.cantPlayers, player);
    } else {
      app.cantPlayers++;
      app.players.push(player);
      Storage.put("appstate", app);
      Storage.put("player" + app.cantPlayers, player);
    }
  }
}

function loadPlayer() {
  if (Storage.get("appstate") != null) {
    let appstate = Storage.get("appstate");
    for (let i = 1; i <= appstate.cantPlayers; i++) {
      let player = Storage.get("player" + i);
      let buttonsBox = document.getElementById("buttons");
      let boxplayer = document.createElement("a");
      boxplayer.style.backgroundColor = player.color;
      boxplayer.setAttribute("href", "one-player.html");
      boxplayer.setAttribute("data-player", i);
      boxplayer.setAttribute("id", "player" + i);
      boxplayer.classList.add("jugador-btn");
      boxplayer.classList.add("flex-center-container");
      let imgplayer = document.createElement("img");
      let nameplayer = document.createElement("p");
      nameplayer.innerHTML = player.name
      nameplayer.setAttribute("id", "jugadores-btn");
      boxplayer.appendChild(imgplayer);
      boxplayer.appendChild(nameplayer);
      buttonsBox.appendChild(boxplayer);
    }
  }
}

function stats() {
  let player1 = Storage.get("player1");
  let player2 = Storage.get("player2");
  document.getElementById("nameplayer1").innerHTML = player1.name;
  document.getElementById("nameplayer2").innerHTML = player2.name;
  document.getElementById("generalaPointsPlayer1").innerHTML = player1.generalaPoints;
  document.getElementById("generalaPointsPlayer2").innerHTML = player2.generalaPoints;
  document.getElementById("tatetiPointsPlayer1").innerHTML = player1.tatetiPoints;
  document.getElementById("tatetiPointsPlayer2").innerHTML = player2.tatetiPoints;
  document.getElementById("totalPlayer1").innerHTML = player1.tatetiPoints + player1.generalaPoints;
  document.getElementById("totalPlayer2").innerHTML = player2.tatetiPoints + player2.generalaPoints;
}

function showPlayer() {

  document.getElementById("playerName").innerHTML = whichPlayer == 1 ? player1.name : player2.name;
}