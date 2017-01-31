$(document).ready(function(){
  /////////////////////////CONNECT WITH HTML//////////////////////////
   var mapa = {   //declaración de rows y columnas del mapa
     rows: 19,
     columns: 33
   };

for (var rowIndex = 0; rowIndex < mapa.rows; rowIndex++){ ///// creación del mapa
    for (var columnIndex = 0; columnIndex < mapa.columns; columnIndex++){
      if (myMaze[rowIndex][columnIndex]) {
        $('.container').append($('<div>')
        .addClass('cell board')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex));
      } else {
        $('.container').append($('<div>')
        .addClass('cell obstacle')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex))
      };
  }
}

$('.board').append($('<img>').addClass('food'));


window.eraseLastPacman = function eraseLastPacman() {  //función para borrar el pacman del movimiento anterior
    var selector = '[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']'; ////erase pacman
    var selectorImg = $("div").find('[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']')[0].innerHTML;
    if (selectorImg == '<img class="food">'){
      if (playerPlaying === "player1"){
        pointsPlayer1 +=23;
      } else {
        pointsPlayer2 +=23;
      }
      $("div").find('[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']')[0].innerHTML = "";
    };
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

Monster.prototype.drawMonster = function(){ // función para borrar el mounstruo del movimiento anterior - ASIGNADO AL CONSTRUCTOR
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
      switch (this.name) {
        case "red":
          $(selector).addClass('monster-red');
          break;
        case "blue":
          $(selector).addClass('monster-blue');
          break;
      }

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
  }
}


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
  startTheGame();
});

window.playerResume = function playerResume(){
  eraseLastPacman();
  redMonster.eraseLastMonsterPosition();
  blueMonster.eraseLastMonsterPosition();
  removeTheFood();
  if (playerPlaying === "player1"){
    $('#points-player1').text("Player 1: "+pointsPlayer1);
    $('#points-resume-player1').text("YOU GET "+pointsPlayer1+ " points!!");
    $('#points').text (0000);
    $('#player1-resume').css('margin', 0);
    $('#start-player2').on("click", function(){
      $('#player1-resume').css('margin', -1000);
      $('.board').append($('<img>').addClass('food'));
      startTheGame();
    });
  } else {
          $('#game-resume').css('margin', 0);
          $('#points-game-resume-player1').text("Player 1: "+pointsPlayer1+" points!!");
          $('#points-game-resume-player2').text("Player 2: "+pointsPlayer2+" points!!");
          checkWhoWin(pointsPlayer1, pointsPlayer2);

  }
      playerPlaying = "player2";
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
  console.log(remainFood2);
  remainFood2.forEach(function(elem){
    elem.remove()
  })
}

function startTheGame(){
  createCharacters();
  redMonster.drawMonster();  //dibujar por primera ver el monstruo rojo
  blueMonster.drawMonster(); //dibujar por primera vez el monstruo azul
  controlTheMaze()
  drawPacman();
  movePacman();
  moveMonsters();
}

var playerPlaying = "player1";
var playerResume;
var pointsPlayer1 = 0;
var pointsPlayer2 = 0;
console.log("Linked");

var T = true, F = false;



var myMaze = [   //dibujo del mapa con T - F
  [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F], //0
  [F, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, F],
  [F, T, F, F, T, F, F, F, T, T, T, T, F, F, F, T, F, F, T, F, F, F, T, T, T, T, F, F, T, F, F, T, F],
  [F, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, F],
  [F, T, F, F, T, T, T, F, F, F, F, F, F, T, T, T, F, F, T, T, T, F, F, F, F, F, F, T, T, T, F, T, F],
  [F, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, F], //5
  [F, F, T, T, T, F, F, F, T, T, T, T, F, F, F, T, T, T, T, F, F, F, T, T, T, T, F, F, F, T, T, T, F],
  [F, F, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, F],
  [F, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, F],
  [F, F, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, T, F, T, T, T, T, T, T, T, T, F, T, T, T, F],
  [F, F, T, T, T, F, T, F, F, F, F, F, F, T, F, T, T, T, T, F, T, F, F, F, F, F, F, T, F, T, T, T, F], //10
  [F, T, T, T, T, T, T, T, T, F, F, T, T, T, T, T, T, T, T, T, T, T, T, F, F, T, T, T, T, T, T, T, F],
  [F, T, F, F, T, F, F, F, T, T, T, T, F, F, F, T, F, F, T, F, F, F, T, T, T, T, F, F, F, T, F, T, F],
  [F, T, T, F, T, T, T, T, T, T, T, T, T, T, T, T, F, T, T, T, T, T, T, T, T, T, T, T, T, T, F, T, F],
  [F, F, T, F, T, T, T, F, F, F, F, F, F, T, T, T, F, T, T, T, T, F, F, F, F, F, F, T, T, T, F, T, F],
  [F, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, T, F, T, T, T, F, F, T, T, T, F, T, T, T, F], //15
  [F, T, F, F, F, F, F, F, T, F, F, T, F, F, F, F, F, F, F, F, F, F, T, F, F, T, F, F, F, F, F, T, F],
  [F, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, F],
  [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F]

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
      if (object.position.column + 1 > 32){
        break;
      } else {
        if (myMaze[(object.position.row)][object.position.column + 1]) { return true; }
      }
    break;
    case 2:
      if (object.position.row + 1 > 18){
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
  console.log(mapa.join('\n') + '\n\n');
}     //función que dibuja el mapa en consola
maper(myMaze);
var printTheMazeId;

function controlTheMaze() {
  printTheMazeId = setInterval(function(){    //intervalo que imprime el nuevo mapa en consola y revisa si los monstruos han comido a Pacman
    // pacmanOnTheMaze(myPacman);
    // redMonster.monsterOnTheMaze();
    // maper(myMaze);
    debugger;
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
    var foodRemain = document.getElementsByClassName('food').length;
    console.log(foodRemain)
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
  }, 100);
}

var intervalIdMonster;
function moveMonsters(){   //intervalo que realiza todos los movimientos de Monstruos
  intervalIdMonster = setInterval(function() {
    debugger

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
  }, 150);
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
      if (this.position.column + 1 > 32){
        break;
      } else {
        if (myMaze[(this.position.row)][this.position.column + 1]) { return true; }
      }
    break;
    case 2:
      if (this.position.row + 1 > 20){
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
  clearInterval(intervalIdMonster);
  moveMonsters();
};
Monster.prototype.switchMonsterDirectionTo0 = function(){
  this.direction = 0;
  clearInterval(intervalIdMonster);
  moveMonsters();
};
Monster.prototype.switchMonsterDirectionTo1 = function(){
  this.direction = 1;
  clearInterval(intervalIdMonster);
  moveMonsters();
};
Monster.prototype.switchMonsterDirectionTo2 = function(){
  this.direction = 2;
  clearInterval(intervalIdMonster);
  moveMonsters();
};
Monster.prototype.switchMonsterDirectionTo3 = function(){
  this.direction = 3;
  clearInterval(intervalIdMonster);
  moveMonsters();
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
