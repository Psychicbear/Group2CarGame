function pauseGame() {
  //pauses the game
  paused = true;
  playScreenSong.pause();
  pauseSpr = createSprite(width / 2, height / 2, 100, 100);
  pauseSpr.addImage(pauseImg);
  pauseSpr.life = 1;
  pauseSpr.scale = 10;
  drawSprite(pauseSpr);
  frameRate(0);
}

function unpauseGame() {
  // unpauses the game
  paused = false;
  frameRate(60);
  playScreenSong.play();
  if (pauseSpr.life != 0) {
    menuselect.play();
  }
  pauseSpr.life = 0;
}
