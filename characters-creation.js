$(document).ready(function(){
///////////DRAW AND REMOVE PACMAN AND MOSNTERS/////////////////////////////////////
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
window.eraseLastPacman = function eraseLastPacman() {  //función para borrar el pacman del movimiento anterior
    var selector = '[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']'; ////erase pacman
    var selectorImg = $("div").find('[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']')[0].innerHTML;
    var selectorCherry = $("div").find('[data-row=' + 1 + '][data-col=' + 26 + ']')[0].innerHTML;
    var selectorApple = $("div").find('[data-row=' + 1 + '][data-col=' + 1 + ']')[0].innerHTML;
    var selectorStrawberry = $("div").find('[data-row=' + 10 + '][data-col=' + 16 + ']')[0].innerHTML;
    if (selectorImg == '<div class="food"></div>'){
      var audio = new Audio('pacman_chomp.mp3');
      audio.play();
      if (playerPlaying === "player1"){
        pointsPlayer1 +=23;
      } else {
        pointsPlayer2 +=23;
      }
      $("div").find('[data-row=' + myPacman.position.row + '][data-col=' + myPacman.position.column + ']')[0].innerHTML = "";
    };
    if (selectorCherry == '<div class="cherry"></div>'){
      if (playerPlaying === "player1" && selectorImg === selectorCherry){
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
        pointsPlayer1 +=103;
        $("div").find('[data-row=' + 1 + '][data-col=' + 26 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      } else if (playerPlaying === "player2" && selectorImg === selectorCherry) {
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
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
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
        pointsPlayer1 +=103;
        $("div").find('[data-row=' + 1 + '][data-col=' + 1 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      } else if (playerPlaying === "player2" && selectorImg === selectorApple) {
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
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
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
        pointsPlayer1 +=103;
        $("div").find('[data-row=' + 10 + '][data-col=' + 16 + ']')[0].innerHTML = "";
        clearInterval(intervalIdMonster);
        clearInterval(printTheMazeId)
        scared = true;
        makeMonstersRunFromPacman();
      } else if (playerPlaying === "player2" && selectorImg === selectorStrawberry) {
        var audio = new Audio('pacman_eatfruit.wav');
        audio.play();
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
};
window.deleteCherry = function deleteCherry(selectorCherry) {
  timeoutIdDeleteCherry = setTimeout(function () {
  $(selectorCherry).removeClass('cherry');
}, 10000);
}
window.deleteApple = function deleteApple(selectorApple) {
  timeoutIdDeleteApple = setTimeout(function () {
  $(selectorApple).removeClass('apple');
}, 10000);
}
window.deleteStrawberry = function deleteStrawberry(selectorStrawberry) {
  timeoutIdDeleteStrawberry = setTimeout(function () {
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
Monster.prototype.drawOpositeMonster = function(){ // función para borrar el mounstruo del movimiento anterior - ASIGNADO AL CONSTRUCTOR
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
  $(selector).addClass('monster-scared');
};
Monster.prototype.eraseScaredMonster = function(){
  var selector = '[data-row=' + this.position.row + '][data-col=' + this.position.column + ']'; ////draw monsters
  $(selector).removeClass('monster-scared');
  clearInterval();
};
});

/////////////CHARACTERS CREATION//////////////////////////////////////
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
var playerPlaying = "player1";
var playerResume;
var pointsPlayer1 = 0;
var pointsPlayer2 = 0;
console.log("Linked");
