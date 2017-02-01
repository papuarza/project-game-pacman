scared = false;

$(document).ready(function(){
  /////////////////////////CONNECT WITH HTML//////////////////////////
   var mapa = {   //declaración de rows y columnas del mapa
     rows: 19,
     columns: 33
   };

for (var rowIndex = 0; rowIndex < mapa.rows; rowIndex++){ ///// creación del mapa
    for (var columnIndex = 0; columnIndex < mapa.columns; columnIndex++){
      if(myMaze[rowIndex][columnIndex] === "TL") {
        $('.container').append($('<div>')
        .addClass('cell obstacle top-left')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex))
      } else if(myMaze[rowIndex][columnIndex] === "TR") {
        $('.container').append($('<div>')
        .addClass('cell obstacle top-right')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex))
      } else if(myMaze[rowIndex][columnIndex] === "BL") {
        $('.container').append($('<div>')
        .addClass('cell obstacle bottom-left')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex))
      } else if(myMaze[rowIndex][columnIndex] === "BR") {
        $('.container').append($('<div>')
        .addClass('cell obstacle bottom-right')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex))
      } else if(myMaze[rowIndex][columnIndex] === "OB") {
        $('.container').append($('<div>')
        .addClass('cell obstacle outside-border')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex))
      } else if (myMaze[rowIndex][columnIndex]) {
        $('.container').append($('<div>')
        .addClass('cell board')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex));
      }
        else {
          $('.container').append($('<div>')
          .addClass('cell obstacle')
          .attr('data-row', rowIndex)
          .attr('data-col', columnIndex))
        }
  }
}

  $('.board').append($('<div>').addClass('food'));


window.eraseLastPacman = function eraseLastPacman() {  //función para borrar el pacman del movimiento anterior
    var selector = '[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']'; ////erase pacman
    var selectorImg = $("div").find('[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']')[0].innerHTML;
    var selectorCherry = $("div").find('[data-row=' + 1 + '][data-col=' + 26 + ']')[0].innerHTML;
    var selectorApple = $("div").find('[data-row=' + 1 + '][data-col=' + 1 + ']')[0].innerHTML;
    var selectorStrawberry = $("div").find('[data-row=' + 10 + '][data-col=' + 16 + ']')[0].innerHTML;
    if (selectorImg == '<div class="food"></div>'){
      if (playerPlaying === "player1"){
        pointsPlayer1 +=23;
      } else {
        pointsPlayer2 +=23;
      }
      $("div").find('[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']')[0].innerHTML = "";
    };
    if (selectorCherry == '<div class="cherry"></div>'){
      if (playerPlaying === "player1" && selectorImg === selectorCherry){
        pointsPlayer1 +=103;
        $("div").find('[data-row=' + 1 + '][data-col=' + 26 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      } else if (playerPlaying === "player2" && selectorImg === selectorCherry) {
        pointsPlayer2 +=103;
        $("div").find('[data-row=' + 1 + '][data-col=' + 26 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      }
    };
    if (selectorApple == '<div class="apple"></div>'){
      if (playerPlaying === "player1" && selectorImg === selectorApple){
        pointsPlayer1 +=103;
        $("div").find('[data-row=' + 1 + '][data-col=' + 1 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      } else if (playerPlaying === "player2" && selectorImg === selectorApple) {
        pointsPlayer2 +=103;
        $("div").find('[data-row=' + 1 + '][data-col=' + 1 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      }
    }
    if (selectorStrawberry == '<div class="strawberry"></div>'){
      if (playerPlaying === "player1" && selectorImg === selectorStrawberry){
        pointsPlayer1 +=103;
        $("div").find('[data-row=' + 10 + '][data-col=' + 16 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      } else if (playerPlaying === "player2" && selectorImg === selectorStrawberry) {
        pointsPlayer2 +=103;
        $("div").find('[data-row=' + 10 + '][data-col=' + 16 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      }
    }


    switch (myPacman.direction) {
      case 0:
        $(selector).removeClass('pacman-up');
        $(selector).removeClass('pacman-down');
        $(selector).removeClass('pacman-left');
        $(selector).removeClass('pacman-right');
        break;
      case 1:
      $(selector).removeClass('pacman-up');
      $(selector).removeClass('pacman-down');
      $(selector).removeClass('pacman-left');
      $(selector).removeClass('pacman-right');
        break;
      case 2:
      $(selector).removeClass('pacman-up');
      $(selector).removeClass('pacman-down');
      $(selector).removeClass('pacman-left');
      $(selector).removeClass('pacman-right');
        break;
      case 3:
      $(selector).removeClass('pacman-up');
      $(selector).removeClass('pacman-down');
      $(selector).removeClass('pacman-left');
      $(selector).removeClass('pacman-right');
        break;
    }
      // var selector = '[data-row-food=' + myPacman.position.row + '][data-col-food=' + myPacman.position.column + ']'; ////draw pacman
      //   $(selector).removeClass('food');
};

window.drawPacman = function drawPacman() { //función para dibujar el pacman del nuevo movimiento
  var selector = '[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']'; ////draw pacman
  switch (myPacman.direction) {
    case 0:
      $(selector).addClass('pacman-up');
      break;
    case 1:
      $(selector).addClass('pacman-right');
      break;
    case 2:
      $(selector).addClass('pacman-down');
      break;
    case 3:
      $(selector).addClass('pacman-left');
      break;
  }
};

window.createFruits = function addFruits() { //función para agregar una fruta;
  var selectorCherry = '[data-row=' + 1 + '][data-col=' + 26 + '] div'; ////draw cherry
  var selectorApple = '[data-row=' + 1 + '][data-col=' + 1 + '] div'; ////draw cherry
  var selectorStrawberry = '[data-row=' + 10 + '][data-col=' + 16 + '] div'; ////draw cherry

  var timeoutIdCherry = setTimeout(function () {
  $(selectorCherry).addClass('cherry')
  $(selectorCherry).removeClass('food')
  deleteCherry(selectorCherry);
}, 2000);
var timeoutIdApple = setTimeout(function () {
$(selectorApple).addClass('apple')
$(selectorApple).removeClass('food')
deleteApple(selectorApple);
}, 20000);
var timeoutIdStrawberry = setTimeout(function () {
$(selectorStrawberry).addClass('strawberry')
$(selectorStrawberry).removeClass('food')
deleteStrawberry(selectorStrawberry);
}, 40000);
};

window.deleteCherry = function deleteCherry(selectorCherry) {
  var timeoutIdDeleteCherry = setTimeout(function () {
  $(selectorCherry).removeClass('cherry');
}, 10000);
}
window.deleteApple = function deleteApple(selectorApple) {
  var timeoutIdDeleteApple = setTimeout(function () {
  $(selectorApple).removeClass('apple');
}, 10000);
}
window.deleteStrawberry = function deleteStrawberry(selectorStrawberry) {
  var timeoutIdDeleteStrawberry = setTimeout(function () {
  $(selectorStrawberry).removeClass('strawberry');
}, 10000);
}

Monster.prototype.drawMonster = function(){ // función para borrar el mounstruo del movimiento anterior - ASIGNADO AL CONSTRUCTOR
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
      switch (this.name) {
        case "red":
          $(selector).addClass('monster-red');
          break;
        case "blue":
          $(selector).addClass('monster-blue');
          break;
        case "yellow":
          $(selector).addClass('monster-yellow');
        break;
      }
};

Monster.prototype.drawOpositeMonster = function(){ // función para borrar el mounstruo del movimiento anterior - ASIGNADO AL CONSTRUCTOR
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
  $(selector).addClass('monster-scared');
};

Monster.prototype.eraseScaredMonster = function(){
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
  $(selector).removeClass('monster-scared');
  clearInterval()
}

Monster.prototype.eraseLastMonsterPosition = function(){ //función para dibujar el monstruo del movimiento nuevo - ASIGNADO AL CONSTRUCTOR
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
  switch (this.name) {
    case "red":
      $(selector).removeClass('monster-red');
      break;
    case "blue":
      $(selector).removeClass('monster-blue');
      break;
    case "yellow":
      $(selector).removeClass('monster-yellow');
      break;
  }
  $(selector).removeClass('monster-scared');
};


/////////////////////////////FIN DE MONTAJE HTML/////////////////////////////////////////

$(document).keydown(function(e) {   //cambio de dirección del pacman con teclas
    switch(e.which) {
        case 37: // left
        myPacman.direction = 3;
        if(isPathForward(myPacman)){
          eraseLastPacman();
          clearInterval(intervalId);

          movePacman();
        }
        break;

        case 38: // up
        myPacman.direction = 0;
        if(isPathForward(myPacman)){
          clearInterval(intervalId);
          eraseLastPacman();
          movePacman();
        }
        break;

        case 39: // right
        myPacman.direction = 1;
        if(isPathForward(myPacman)){
          clearInterval(intervalId);
          eraseLastPacman();
          movePacman();
        }
        break;

        case 40: // down
        myPacman.direction = 2;
        if(isPathForward(myPacman)){
          eraseLastPacman();
          clearInterval(intervalId);
          movePacman();
        }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$('#start').on("click", function(e){
  startTheGame();
});
$('#start-the-game-home').on("click", function(e){
  $('.home-page').css('margin', -1000);
  startTheGame();
});
$('#play-again').on("click", function(e){
  $('#game-resume').css('margin', -1000);
  eraseLastPacman();
  removeTheFood();
  clearInterval(printTheMazeId);
  clearInterval(intervalId);
  clearInterval(intervalIdMonster);
  redMonster.eraseLastMonsterPosition();
  blueMonster.eraseLastMonsterPosition();
  yellowMonster.eraseLastMonsterPosition();
  startTheGame();
});

window.playerResume = function playerResume(){
  eraseLastPacman();
  removeTheFood();
  clearInterval(printTheMazeId);
  clearInterval(intervalId);
  clearInterval(intervalIdMonster);
  redMonster.eraseLastMonsterPosition();
  blueMonster.eraseLastMonsterPosition();
  yellowMonster.eraseLastMonsterPosition();
  if (playerPlaying === "player1"){
    $('#points-player1').text("Player 1: "+pointsPlayer1);
    $('#points-resume-player1').text("YOU GET "+pointsPlayer1+ " points!!");
    $('#points').text (0000);
    $('#player1-resume').css('margin', 0);
  } else {
          $('#game-resume').css('margin', 0);
          $('#points-game-resume-player1').text("Player 1: "+pointsPlayer1+" points!!");
          $('#points-game-resume-player2').text("Player 2: "+pointsPlayer2+" points!!");
          checkWhoWin(pointsPlayer1, pointsPlayer2);
  }
  $('#start-player2').on("click", function(){
    $('#player1-resume').css('margin', -1000);
    removeTheFood();
    $('.board').append($('<div>').addClass('food'));
    playerPlaying = "player2";
    return startTheGame();
  });
}

function checkWhoWin (ply1, ply2){
  if(ply1>ply2) {
    $('#resume-message').text("Player 2 you should practice, Player 1 just  ");
  } else if (ply2>ply1) {
    $('#resume-message').text("Player 1 you should practice, Player 2 just  ");
  } else {
    $('#resume-message').text("WTF??? A TIE?? YOU BOTH SHOULD PRACTICE!!");
    $('#ass-kick').text("");
  }
}

});   //fin del jquery

var Monster = function(name, color, direction, position) { // constructor del mounstruo
  this.position = position;
  this.direction = direction;
  this.color = color;
  this.name = name;
};

var redMonster, blueMonster, yellowMonster, myPacman;



function createCharacters() {
  redMonster = new Monster("red", "red", 1, {row: 3, column: 17});
  blueMonster = new Monster("blue", "blue", 2, {row: 3, column: 5});
  yellowMonster = new Monster("yellow", "yellow", 3, {row: 1, column: 1});
  myPacman = {  // creación de PACMAN
    direction: 1,
    position: {
      row: 13,
      column: 10}
  }
}

function removeTheFood() {
  remainFood = document.getElementsByClassName('food');
  remainFood2 = Array.prototype.slice.call(remainFood);
  remainFood2.forEach(function(elem){
    elem.remove()
  })
  remainCherry = document.getElementsByClassName('cherry');
  remainCherry2 = Array.prototype.slice.call(remainCherry);
  remainCherry2.forEach(function(elem){
    elem.remove()
  })
  remainApple = document.getElementsByClassName('apple');
  remainApple2 = Array.prototype.slice.call(remainApple);
  remainApple2.forEach(function(elem){
    elem.remove()
  })
  remainStrawberry = document.getElementsByClassName('strawberry');
  remainStrawberry2 = Array.prototype.slice.call(remainStrawberry);
  remainStrawberry2.forEach(function(elem){
    elem.remove()
  })
}

function startTheGame(){
  debugger;
  createCharacters();
  redMonster.drawMonster();  //dibujar por primera ver el monstruo rojo
  blueMonster.drawMonster(); //dibujar por primera vez el monstruo azul
  yellowMonster.drawMonster(); //dibujar por primera vez el monstruo amarillo
  clearInterval(printTheMazeId);
  clearInterval(intervalId);
  clearInterval(intervalIdMonster);
  controlTheMaze()
  drawPacman();
  movePacman();
  moveMonsters();
  createFruits();
}

var playerPlaying = "player1";
var playerResume;
var pointsPlayer1 = 0;
var pointsPlayer2 = 0;
console.log("Linked");

var T = true, F = false;
var TL = "TL" ,TR = "TR",BL = "BL", BR = "BR", OB = "OB";



var myMaze = [   //dibujo del mapa con T - F
  [TL, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, TR], //0
  [OB, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, OB],
  [OB, T, F, F, T, F, F, F, T, T, T, T, F, F, F, T, F, F, T, F, F, F, T, T, T, T, F, F, T, F, F, T, OB],
  [OB, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, OB],
  [OB, T, F, F, T, T, T, F, F, F, F, F, F, T, T, T, F, F, T, T, T, F, F, F, F, F, F, T, T, T, F, T, OB],
  [OB, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, OB], //5
  [OB, F, T, T, T, F, F, F, T, T, T, T, F, F, F, T, T, T, T, F, F, F, T, T, T, T, F, F, F, T, T, T, OB],
  [OB, F, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, OB],
  [OB, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, OB],
  [OB, F, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, OB],
  [OB, F, T, T, T, F, T, F, F, F, F, F, F, T, F, T, T, T, T, F, T, F, F, F, F, F, F, T, F, T, T, T, OB], //10
  [OB, T, T, T, T, T, T, T, T, F, F, T, T, T, T, T, T, T, T, T, T, T, T, F, F, T, T, T, T, T, T, T, OB],
  [OB, T, F, F, T, F, F, F, T, T, T, T, F, F, F, T, F, F, T, F, F, F, T, T, T, T, F, F, F, T, F, T, OB],
  [OB, T, T, F, T, T, T, T, T, T, T, T, T, T, T, T, F, T, T, T, T, T, T, T, T, T, T, T, T, T, F, T, OB],
  [OB, F, T, F, T, T, T, F, F, F, F, F, F, T, T, T, F, T, T, T, T, F, F, F, F, F, F, T, T, T, F, T, OB],
  [OB, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, OB], //15
  [OB, T, F, F, F, F, F, F, T, F, F, T, F, F, F, F, F, F, F, F, F, F, T, F, F, T, F, F, F, F, F, T, OB],
  [OB, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, OB],
  [BL, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, OB, BR]

];


//direction puede ser 0: Up, 1: Right, 2: Down, 3: Left


// pacmanOnTheMaze(myPacman);

//colocar el pacman
// function pacmanOnTheMaze(object){
//   myMaze[object.position.row][object.position.column] = "PACM";
// }

function deleteLastPosition(object){
  myMaze[object.position.row][object.position.column] = T;
}

function isPathForward(object){       //función que revisa si tenemos espacio delante para avanzar
  switch (myPacman.direction) {
    case 0:
      if (object.position.row - 1 < 1){
        break;
      } else {
        if (myMaze[(object.position.row - 1)][object.position.column]) { return true; }
      }
    break;
    case 1:
      if (object.position.column + 1 > 31){
        break;
      } else {
        if (myMaze[(object.position.row)][object.position.column + 1]) { return true; }
      }
    break;
    case 2:
      if (object.position.row + 1 > 17){
        break;
      } else {
        if (myMaze[(object.position.row + 1)][object.position.column]) { return true }
      }
    break;
    case 3:
      if (object.position.column - 1 < 1){
        break;
      } else {
        if (myMaze[(object.position.row)][object.position.column - 1]) { return true }
      }
    break;
}
return false;
}

function moveForward(object){   //función que mueve el Pacman para adelante en base a su dirección
  if (playerPlaying === "player1"){
    document.getElementById('points').innerHTML = pointsPlayer1;
  } else {
    document.getElementById('points').innerHTML = pointsPlayer2;
  }
  switch (myPacman.direction) {
    case 0:
        myPacman.position.row = myPacman.position.row - 1;
      break;
    case 1:
        myPacman.position.column = myPacman.position.column + 1;
    break;
    case 2:
        myPacman.position.row = myPacman.position.row + 1;
    break;
    case 3:
        myPacman.position.column = myPacman.position.column - 1;
    break;
  }
}

function maper(mapa) {
  //console.log(mapa.join('\n') + '\n\n');
}     //función que dibuja el mapa en consola
maper(myMaze);
var printTheMazeId;

function controlTheMaze() {
  printTheMazeId = setInterval(function(){    //intervalo que imprime el nuevo mapa en consola y revisa si los monstruos han comido a Pacman
    // pacmanOnTheMaze(myPacman);
    // redMonster.monsterOnTheMaze();
    // maper(myMaze);
    if (redMonster.checkIfMonsterEatPacman()){
      clearInterval(intervalIdMonster);
      playerResume();
      return;
    }
    if (blueMonster.checkIfMonsterEatPacman()){
      clearInterval(intervalIdMonster);
      playerResume();
      return;
    }
    if (yellowMonster.checkIfMonsterEatPacman()){
      clearInterval(intervalIdMonster);
      playerResume();
      return;
    }
    var foodRemain = document.getElementsByClassName('food').length;
    if(foodRemain === 0) {
      playerResume();
    };
  }, 40);
}


var intervalId;
function movePacman(){    //intervalo que realiza todos los movimientos de Pacman
  intervalId = setInterval(function() {
    deleteLastPosition(myPacman);
    if (isPathForward(myPacman)) {
      eraseLastPacman();
      moveForward(myPacman);
      drawPacman();
    } else {
      clearInterval(intervalId);
    }
  }, 150);
}

var intervalIdMonster;
function moveMonsters(){   //intervalo que realiza todos los movimientos de Monstruos
  intervalIdMonster = setInterval(function() {
    if (redMonster.isPathForwardMonster()) {
      redMonster.deleteMonsterLastPosition();
      redMonster.moveMonsterForward();
      redMonster.drawMonster();
      redMonster.followThePacman();
    } else {
      redMonster.switchMonsterDirection();
      if (redMonster.isPathForwardMonster()) {
        redMonster.deleteMonsterLastPosition();
        redMonster.moveMonsterForward();
        redMonster.drawMonster();
        redMonster.followThePacman();
      } else {
        redMonster.switchMonsterDirectionTo0();
        if (redMonster.isPathForwardMonster()) {
          redMonster.deleteMonsterLastPosition();
          redMonster.moveMonsterForward();
          redMonster.drawMonster();
          redMonster.followThePacman();
        } else {
          redMonster.switchMonsterDirectionTo1();
          if (redMonster.isPathForwardMonster()) {
            redMonster.deleteMonsterLastPosition();
            redMonster.moveMonsterForward();
            redMonster.drawMonster();
            redMonster.followThePacman();
          } else {
            redMonster.switchMonsterDirectionTo2();
            if (redMonster.isPathForwardMonster()) {
              redMonster.deleteMonsterLastPosition();
              redMonster.moveMonsterForward();
              redMonster.drawMonster();
              redMonster.followThePacman();
            } else {
              redMonster.switchMonsterDirectionTo3();
            }
          }
        }
      }
    }

    if (blueMonster.isPathForwardMonster()) {
      blueMonster.deleteMonsterLastPosition();
      blueMonster.moveMonsterForward();
      blueMonster.drawMonster();
      blueMonster.followThePacman();
    } else {
      blueMonster.switchMonsterDirection();
      if (blueMonster.isPathForwardMonster()) {
        blueMonster.deleteMonsterLastPosition();
        blueMonster.moveMonsterForward();
        blueMonster.drawMonster();
        blueMonster.followThePacman();
      } else {
        blueMonster.switchMonsterDirectionTo0();
        if (blueMonster.isPathForwardMonster()) {
          blueMonster.deleteMonsterLastPosition();
          blueMonster.moveMonsterForward();
          blueMonster.drawMonster();
          blueMonster.followThePacman();
        } else {
          blueMonster.switchMonsterDirectionTo1();
          if (blueMonster.isPathForwardMonster()) {
            blueMonster.deleteMonsterLastPosition();
            blueMonster.moveMonsterForward();
            blueMonster.drawMonster();
            blueMonster.followThePacman();
          } else {
            blueMonster.switchMonsterDirectionTo2();
            if (blueMonster.isPathForwardMonster()) {
              blueMonster.deleteMonsterLastPosition();
              blueMonster.moveMonsterForward();
              blueMonster.drawMonster();
              blueMonster.followThePacman();
            } else {
              blueMonster.switchMonsterDirectionTo3();
            }
          }
        }
      }
    }

    if (yellowMonster.isPathForwardMonster()) {
      yellowMonster.deleteMonsterLastPosition();
      yellowMonster.moveMonsterForward();
      yellowMonster.drawMonster();
      yellowMonster.followThePacman();
    } else {
      yellowMonster.switchMonsterDirection();
      if (yellowMonster.isPathForwardMonster()) {
        yellowMonster.deleteMonsterLastPosition();
        yellowMonster.moveMonsterForward();
        yellowMonster.drawMonster();
        yellowMonster.followThePacman();
      } else {
        yellowMonster.switchMonsterDirectionTo0();
        if (yellowMonster.isPathForwardMonster()) {
          yellowMonster.deleteMonsterLastPosition();
          yellowMonster.moveMonsterForward();
          yellowMonster.drawMonster();
          yellowMonster.followThePacman();
        } else {
          yellowMonster.switchMonsterDirectionTo1();
          if (yellowMonster.isPathForwardMonster()) {
            yellowMonster.deleteMonsterLastPosition();
            yellowMonster.moveMonsterForward();
            yellowMonster.drawMonster();
            yellowMonster.followThePacman();
          } else {
            yellowMonster.switchMonsterDirectionTo2();
            if (yellowMonster.isPathForwardMonster()) {
              yellowMonster.deleteMonsterLastPosition();
              yellowMonster.moveMonsterForward();
              yellowMonster.drawMonster();
              yellowMonster.followThePacman();
            } else {
              yellowMonster.switchMonsterDirectionTo3();
            }
          }
        }
      }
    }
  }, 200);
}

var intervalIdMonster;
function makeMonstersRunFromPacman(){   //intervalo que realiza todos los movimientos de Monstruos
  var timeoutMonsterScared = setTimeout(function () {
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    clearInterval(intervalIdMonster);
    clearInterval(printTheMazeId)
    scared = false;
    moveMonsters();
    controlTheMaze();
}, 10000);
debugger;
if (redMonster.checkIfPacmanEatMonster()){
  redMonster.eraseScaredMonster();
  clearInterval(intervalIdRedMonsterRunning);
  return;
}
if (blueMonster.checkIfPacmanEatMonster()){
  blueMonster.eraseScaredMonster();
  clearInterval(intervalIdBlueMonsterRunning);
  return;
}
if (yellowMonster.checkIfPacmanEatMonster()){
  yellow.eraseScaredMonster();
  clearInterval(intervalIdYellowMonsterRunning);
  return;
}
intervalIdRedMonsterRunning = setInterval(function() {
    redMonster.drawOpositeMonster();
    if (redMonster.isPathForwardMonster()) {
      redMonster.deleteMonsterLastPosition();
      redMonster.moveMonsterForward();
      redMonster.drawOpositeMonster();
    } else {
      redMonster.switchMonsterDirection();
      if (redMonster.isPathForwardMonster()) {
        redMonster.deleteMonsterLastPosition();
        redMonster.moveMonsterForward();
        redMonster.drawOpositeMonster();
      } else {
        redMonster.switchMonsterDirectionTo0();
        if (redMonster.isPathForwardMonster()) {
          redMonster.deleteMonsterLastPosition();
          redMonster.moveMonsterForward();
          redMonster.drawOpositeMonster();
        } else {
          redMonster.switchMonsterDirectionTo1();
          if (redMonster.isPathForwardMonster()) {
            redMonster.deleteMonsterLastPosition();
            redMonster.moveMonsterForward();
            redMonster.drawOpositeMonster();
          } else {
            redMonster.switchMonsterDirectionTo2();
            if (redMonster.isPathForwardMonster()) {
              redMonster.deleteMonsterLastPosition();
              redMonster.moveMonsterForward();
              redMonster.drawOpositeMonster();
            } else {
              redMonster.switchMonsterDirectionTo3();
            }
          }
        }
      }
    }
},250);
intervalIdBlueMonsterRunning = setInterval(function() {
    blueMonster.drawOpositeMonster();
    if (blueMonster.isPathForwardMonster()) {
      blueMonster.deleteMonsterLastPosition();
      blueMonster.moveMonsterForward();
      blueMonster.drawOpositeMonster();
    } else {
      blueMonster.switchMonsterDirection();
      if (blueMonster.isPathForwardMonster()) {
        blueMonster.deleteMonsterLastPosition();
        blueMonster.moveMonsterForward();
        blueMonster.drawOpositeMonster();
      } else {
        blueMonster.switchMonsterDirectionTo0();
        if (blueMonster.isPathForwardMonster()) {
          blueMonster.deleteMonsterLastPosition();
          blueMonster.moveMonsterForward();
          blueMonster.drawOpositeMonster();
        } else {
          blueMonster.switchMonsterDirectionTo1();
          if (blueMonster.isPathForwardMonster()) {
            blueMonster.deleteMonsterLastPosition();
            blueMonster.moveMonsterForward();
            blueMonster.drawOpositeMonster();
          } else {
            blueMonster.switchMonsterDirectionTo2();
            if (blueMonster.isPathForwardMonster()) {
              blueMonster.deleteMonsterLastPosition();
              blueMonster.moveMonsterForward();
              blueMonster.drawOpositeMonster();
            } else {
              blueMonster.switchMonsterDirectionTo3();
            }
          }
        }
      }
    }
},250);

intervalIdYellowMonsterRunning = setInterval(function() {
    yellowMonster.drawOpositeMonster();
    if (yellowMonster.isPathForwardMonster()) {
      yellowMonster.deleteMonsterLastPosition();
      yellowMonster.moveMonsterForward();
      yellowMonster.drawOpositeMonster();
    } else {
      yellowMonster.switchMonsterDirection();
      if (yellowMonster.isPathForwardMonster()) {
        yellowMonster.deleteMonsterLastPosition();
        yellowMonster.moveMonsterForward();
        yellowMonster.drawOpositeMonster();
      } else {
        yellowMonster.switchMonsterDirectionTo0();
        if (yellowMonster.isPathForwardMonster()) {
          yellowMonster.deleteMonsterLastPosition();
          yellowMonster.moveMonsterForward();
          yellowMonster.drawOpositeMonster();
        } else {
          yellowMonster.switchMonsterDirectionTo1();
          if (yellowMonster.isPathForwardMonster()) {
            yellowMonster.deleteMonsterLastPosition();
            yellowMonster.moveMonsterForward();
            yellowMonster.drawOpositeMonster();
          } else {
            yellowMonster.switchMonsterDirectionTo2();
            if (yellowMonster.isPathForwardMonster()) {
              yellowMonster.deleteMonsterLastPosition();
              yellowMonster.moveMonsterForward();
              yellowMonster.drawOpositeMonster();
            } else {
              yellowMonster.switchMonsterDirectionTo3();
            }
          }
        }
      }
    }
  }, 250);
}



//////////////////MONSTERS/////////////////

Monster.prototype.deleteMonsterLastPosition = function(object){
    myMaze[this.position.row][this.position.column] = T;
};

Monster.prototype.checkIfMonsterEatPacman = function() {
  if (this.position.row === myPacman.position.row && this.position.column === myPacman.position.column) {
    console.log("YOU LOSE!!!");
    clearInterval(printTheMazeId);
    clearInterval(intervalId);
    // clearInterval(intervalIdMonster);
    return true;
  } else {
    return false;
  }
};

Monster.prototype.checkIfPacmanEatMonster = function() {
  if (this.position.row === myPacman.position.row && this.position.column === myPacman.position.column) {
    console.log("Well done Pacman!!!");
    // clearInterval(intervalIdMonster);
    return true;
  } else {
    return false;
  }
};

Monster.prototype.isPathForwardMonster = function(object){
  switch (this.direction) {
    case 0:
      if (this.position.row - 1 < 1){
        break;
      } else {
        if (myMaze[(this.position.row - 1)][this.position.column]) { return true; }
      }
    break;
    case 1:
      if (this.position.column + 1 > 31){
        break;
      } else {
        if (myMaze[(this.position.row)][this.position.column + 1]) { return true; }
      }
    break;
    case 2:
      if (this.position.row + 1 > 17){
        break;
      } else {
        if (myMaze[(this.position.row + 1)][this.position.column]) { return true; }
      }
    break;
    case 3:
      if (this.position.column - 1 < 1){
        break;
      } else {
        if (myMaze[(this.position.row)][this.position.column - 1]) { return true; }
      }
    break;
}
return false;
};

Monster.prototype.followThePacman = function(){
  if(myPacman.position.row > this.position.row){
    this.direction = 2;
  } else if (myPacman.position.row < this.position.row){
    this.direction = 0;
  } else if(myPacman.position.column > this.position.column){
    this.direction = 1;
  } else if (myPacman.position.column < this.position.column){
    this.direction = 3;
  }
  clearInterval(intervalIdMonster);
  moveMonsters();
};

Monster.prototype.followThePacman2 = function(){
  if(myPacman.position.row < this.position.row){
    this.direction = 0;
  } else if (myPacman.position.row > this.position.row){
    this.direction = 2;
  } else if(myPacman.position.column < this.position.column){
    this.direction = 3;
  } else if (myPacman.position.column > this.position.column){
    this.direction = 1;
  }
  clearInterval(intervalIdMonster);
  moveMonsters();
};

Monster.prototype.followThePacman3 = function(){
  if(myPacman.position.row > this.position.row){
    this.direction = 2;
  } else if (myPacman.position.row < this.position.row){
    this.direction = 0;
  } else if(myPacman.position.column > this.position.column){
    this.direction = 1;
  } else if (myPacman.position.column < this.position.column){
    this.direction = 3;
  }
  clearInterval(intervalIdMonster);
  moveMonsters();
};

Monster.prototype.switchMonsterDirection = function(){
  if(myPacman.position.column > this.position.column){
    this.direction = 1;
  } else if (myPacman.position.column < this.position.column){
    this.direction = 3;
  } else if(myPacman.position.row > this.position.row){
    this.direction = 2;
  } else if (myPacman.position.row < this.position.row){
    this.direction = 0;
  }
  if (scared){
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    makeMonstersRunFromPacman();
  } else {
    clearInterval(intervalIdMonster);
    moveMonsters();
  }
};
Monster.prototype.switchMonsterDirectionTo0 = function(){
  this.direction = 0;
  if (scared){
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    makeMonstersRunFromPacman();
  } else {
    clearInterval(intervalIdMonster);
    moveMonsters();
  }
};
Monster.prototype.switchMonsterDirectionTo1 = function(){
  this.direction = 1;
  if (scared){
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    makeMonstersRunFromPacman();
  } else {
    clearInterval(intervalIdMonster);
    moveMonsters();
  }
};
Monster.prototype.switchMonsterDirectionTo2 = function(){
  this.direction = 2;
  if (scared){
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    makeMonstersRunFromPacman();
  } else {
    clearInterval(intervalIdMonster);
    moveMonsters();
  }
};
Monster.prototype.switchMonsterDirectionTo3 = function(){
  this.direction = 3;
  if (scared){
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    makeMonstersRunFromPacman();
  } else {
    clearInterval(intervalIdMonster);
    moveMonsters();
  }
};


// Monster.prototype.checkIfMonsterEatPacman = function() {
//   if (this.position.row === myPacman.position.row && this.position.column === myPacman.position.column) {
//     console.log("YOU LOSE!!!");
//     debugger
//     clearInterval(printTheMazeId);
//     clearInterval(intervalIdMonster);
//     return;
//   }
// }


Monster.prototype.moveMonsterForward = function(){
  switch (this.name) {
    case "red":
      redMonster.eraseLastMonsterPosition();;
      break;
    case "blue":
      blueMonster.eraseLastMonsterPosition();;
      break;
      case "yellow":
        yellowMonster.eraseLastMonsterPosition();;
        break;

            yellowMonster.eraseLastMonsterPosition();
  }
  switch (this.direction) {
    case 0:
        this.position.row = this.position.row - 1;
      break;
    case 1:
        this.position.column = this.position.column + 1;
    break;
    case 2:
        this.position.row = this.position.row + 1;
    break;
    case 3:
        this.position.column = this.position.column - 1;
    break;
  }
}

Monster.prototype.monsterOnTheMaze = function(){
  myMaze[this.position.row][this.position.column] = "MONS";
}
