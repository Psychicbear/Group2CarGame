let LOADING = 0
let MAIN_MENU = 1
let PLAY = 2
let LEADEROARD = 3
let INTRUCTIONS = 4

function preload() {
  
}

function setup() {
 
}

function draw() {
  switch (currentScene) {
    case LOADING:
      drawLoadingScreen();
      break;
    case MAIN_MENU:
      drawMainMenuScreen();
      break;
    case PLAY:
      drawPlayScreen();
      break;
    case LEADERBOARD:
      drawLeaderboardScreen();
      break;
    case INSTRUCTIONS:
      drawControlsScreen();
      break;
  }
}

function drawLoadingScreen(){

}

function drawMainMenuScreen(){

}

function drawPlayScreen(){

}

function drawLeaderboardScreen(){

}

function drawInstructionsScreen(){
  
}