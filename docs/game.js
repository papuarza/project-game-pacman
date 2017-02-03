scared = false;
$(document).ready(function(){
  var audio = new Audio('pacman_beginning.wav');
  audio.play();
  /////////////////////////CONNECT WITH HTML//////////////////////////
   var mapa = {   //declaración de rows y columnas del mapa
     rows: 19,
     columns: 33
   };
//////////////////SET THE GRID FOR THE GAME//////////////////////////////////////
for (var rowIndex = 0; rowIndex < mapa.rows; rowIndex++){ // creación del mapa
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
$('.board').append($('<div>').addClass('food')); //agrega food a todas las celdas
window.timeoutIdCherry;
window.timeoutIdApple;
window.timeoutIdStrawberry;
window.createFruits = function createFruits() { //función para agregar las fruta;
  var selectorCherry = '[data-row=' + 1 + '][data-col=' + 26 + '] div'; ////draw cherry
  var selectorApple = '[data-row=' + 1 + '][data-col=' + 1 + '] div'; ////draw cherry
  var selectorStrawberry = '[data-row=' + 10 + '][data-col=' + 16 + '] div'; ////draw cherry
  timeoutIdCherry = setTimeout(function () {
    $(selectorCherry).addClass('cherry');
    $(selectorCherry).removeClass('food');
    deleteCherry(selectorCherry);
  }, 2000);
  timeoutIdApple = setTimeout(function () {
  $(selectorApple).addClass('apple');
  $(selectorApple).removeClass('food');
  deleteApple(selectorApple);
  }, 20000);
  timeoutIdStrawberry = setTimeout(function () {
  $(selectorStrawberry).addClass('strawberry');
  $(selectorStrawberry).removeClass('food');
  deleteStrawberry(selectorStrawberry);
  }, 40000);
  };

/////////////////////////////SWITCH PACMAN DIRECTION WITH ARROWS/////////////////////

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
////////////////COMMANDS TO START THE GAME///////////////////////////////////////////
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
/////////////RESUME PAGE SHOWN WHEN THE GAME ENDS//////////////////////////////
window.playerResume = function playerResume(){
  eraseLastPacman();
  removeTheFood();
  clearInterval(printTheMazeId);
  clearInterval(intervalId);
  clearInterval(intervalIdMonster);
  clearInterval(intervalIdCheckPacmanEatingMonsters);
  clearTimeout(timeoutIdDeleteCherry);
  clearTimeout(timeoutIdDeleteApple);
  clearTimeout(timeoutIdDeleteStrawberry);
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
$('#about-button-home').on("click",function(){
  console.log('ksaghksa')
  $('.about-page').css('visibility', 'visible');
});
$('.escape').on("click",function(){
  $('.about-page').css('visibility', 'hidden');
});

});
////////////////////fin del jquery/////////////////////////////////////
/////////////////START THE GAME/////////////////////////////////////
function startTheGame(){
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
//////////////////REMOVE ALL THE FOOD/////////////////////////
function removeTheFood() {
  remainFood = document.getElementsByClassName('food');
  remainFood2 = Array.prototype.slice.call(remainFood);
  remainFood2.forEach(function(elem){
    elem.remove()
  })
  remainCherry = document.getElementsByClassName('cherry');
  remainCherry2 = Array.prototype.slice.call(remainCherry);
  clearTimeout(timeoutIdCherry);
  remainCherry2.forEach(function(elem){
    elem.remove()
  })
  remainApple = document.getElementsByClassName('apple');
  remainApple2 = Array.prototype.slice.call(remainApple);
  clearTimeout(timeoutIdApple);
  remainApple2.forEach(function(elem){
    elem.remove()
  })
  remainStrawberry = document.getElementsByClassName('strawberry');
  remainStrawberry2 = Array.prototype.slice.call(remainStrawberry);
  clearTimeout(timeoutIdStrawberry);
  remainStrawberry2.forEach(function(elem){
    elem.remove()
  })
}
////////////////////MAP STRUCTURE////////////////////////////
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
var timeoutIdDeleteCherry, timeoutIdDeleteApple, timeoutIdDeleteStrawberry;
/////////////////PACMAN CONTROL FUNCTIONS//////////////////
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
///////////////////INTERVALS FOR CHECK THE MAZE STATUS, PACMAN, AND MONSTERS/////////////////////
