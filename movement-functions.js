function controlTheMaze() {
  printTheMazeId = setInterval(function(){    //intervalo que imprime el nuevo mapa en consola y revisa si los monstruos han comido a Pacman
    // pacmanOnTheMaze(myPacman);
    // redMonster.monsterOnTheMaze();
    // maper(myMaze);
    if (redMonster.checkIfMonsterEatPacman()){
      var audio = new Audio('pacman_death.wav');
      audio.play();
      clearInterval(intervalIdMonster);
      playerResume();
      return;
    }
    if (blueMonster.checkIfMonsterEatPacman()){
      var audio = new Audio('pacman_death.wav');
      audio.play();
      clearInterval(intervalIdMonster);
      playerResume();
      return;
    }
    if (yellowMonster.checkIfMonsterEatPacman()){
      var audio = new Audio('pacman_death.wav');
      audio.play();
      clearInterval(intervalIdMonster);
      playerResume();
      return;
    }
    var foodRemain = document.getElementsByClassName('food').length;
    if(foodRemain === 0) {
      playerResume();
    };

  }, 20);
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
      // clearInterval(intervalId);
    }
  }, 120);
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
        blueMonster.switchMonsterDirectionTo3();
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
            blueMonster.switchMonsterDirectionTo0();
            if (blueMonster.isPathForwardMonster()) {
              blueMonster.deleteMonsterLastPosition();
              blueMonster.moveMonsterForward();
              blueMonster.drawMonster();
              blueMonster.followThePacman();
            } else {
              blueMonster.switchMonsterDirectionTo2();
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
        yellowMonster.switchMonsterDirectionTo2();
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
            yellowMonster.switchMonsterDirectionTo3();
            if (yellowMonster.isPathForwardMonster()) {
              yellowMonster.deleteMonsterLastPosition();
              yellowMonster.moveMonsterForward();
              yellowMonster.drawMonster();
              yellowMonster.followThePacman();
            } else {
              yellowMonster.switchMonsterDirectionTo1();
            }
          }
        }
      }
    }
  }, 200);
}
var intervalIdMonster;
var intervalIdCheckPacmanEatingMonsters;
var pacmanEatsRedMonster = false;
var pacmanEatsBlueMonster = false;
var pacmanEatsYellowMonster = false;
function makeMonstersRunFromPacman(){   //intervalo que realiza todos los movimientos de Monstruos
  var timeoutMonsterScared = setTimeout(function () {
    clearInterval(intervalIdRedMonsterRunning);
    clearInterval(intervalIdBlueMonsterRunning);
    clearInterval(intervalIdYellowMonsterRunning);
    clearInterval(intervalIdMonster);
    clearInterval(printTheMazeId);
    clearInterval(intervalIdCheckPacmanEatingMonsters);
    scared = false;
    moveMonsters();
    controlTheMaze();
    pacmanEatsRedMonster = false;
    pacmanEatsBlueMonster = false;
    pacmanEatsYellowMonster = false;
    clearTimeout(timeoutMonsterScared)
}, 8000);
intervalIdCheckPacmanEatingMonsters = setInterval(function(){
  if (redMonster.checkIfPacmanEatMonster()){
    // var audio = new Audio('pacman_eatghost.wav');
    // audio.play();
    pacmanEatsRedMonster = true;
    redMonster.eraseScaredMonster();
    if (playerPlaying === "player1"){
      pointsPlayer1 +=0;
    } else {
      pointsPlayer2 +=0;
    }
    return;
  }
  if (blueMonster.checkIfPacmanEatMonster()){
    // var audio = new Audio('pacman_eatghost.wav');
    // audio.play();
    pacmanEatsBlueMonster = true;
    blueMonster.eraseScaredMonster();
    if (playerPlaying === "player1"){
      pointsPlayer1 +=0;
    } else {
      pointsPlayer2 +=0;
    }
    // alert("great done!")
    // blueMonster.eraseScaredMonster();
    return;
  }
  if (yellowMonster.checkIfPacmanEatMonster()){
    // var audio = new Audio('pacman_eatghost.wav');
    // audio.play();
    pacmanEatsYellowMonster = true;
    yellowMonster.eraseScaredMonster();
    if (playerPlaying === "player1"){
      pointsPlayer1 +=0;
    } else {
      pointsPlayer2 +=0;
    }
    // alert("great done!")
    // yellow.eraseScaredMonster();
    return;
  }
},40);
intervalIdRedMonsterRunning = setInterval(function() {
  if(pacmanEatsRedMonster){

  } else {
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
  }
},250);
intervalIdBlueMonsterRunning = setInterval(function() {
  if(pacmanEatsBlueMonster){

  } else {
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
  }
},250);
intervalIdYellowMonsterRunning = setInterval(function() {
  if(pacmanEatsYellowMonster){

  } else {
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
  }
  }, 250);
}
//////////////////MONSTERS CONTOLS/////////////////
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
Monster.prototype.moveMonsterForward = function(){
  switch (this.name) {
    case "red":
      redMonster.eraseLastMonsterPosition();
      break;
    case "blue":
      blueMonster.eraseLastMonsterPosition();
      break;
      case "yellow":
        yellowMonster.eraseLastMonsterPosition();
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
};
Monster.prototype.monsterOnTheMaze = function(){
  myMaze[this.position.row][this.position.column] = "MONS";
};
