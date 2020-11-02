/*
  function resetGame(): Maddie
        carSprite.position.x = c; (reseting to start position)
  function finishGame(): 
        carSprite.position.x = 2000; (crossing finish line)
        if lap finshed
          score ++
  function createCar():
    createsprite named carSprite 
  
  function createMap(): Tama
    create sprite
    create group grassGroup    grassGroup = new Group();
  function car movement: Riley
    check keypresses with keyIsDown
    keypress up & down change var carSpeed if speed < 3
    keypress left & right change var carAngle
    make sure decel doesn't make car go backwards
  function car collision with grass:
    check car overlap with grassGroup  (grassGroup.overlap(carSprite, resetGame))
  draw:
    display score as laps
*/
/* 
  Components:
  CreateTrack: Tama
  CreateCar:

  GrassCollision
*/
let tracktxt;
let grassGroup;
let initialx = 250;
let initialy = 650;
let carSpeed = 0;
let carAngle = 270;

function preload() {
  carImg = loadImage("Sprites/Car.png");
  grassImg = loadImage("Sprites/grass.png");
  tracktxt = loadStrings("track.txt");
  roadImg = loadImage("Sprites/road.png");
}

function setup() {
  angleMode(DEGREES);
  createMap();
  carSprite = createSprite(initialx, initialy, 50, 50);
  carSprite.addImage(carImg);
}

function resetGame() {
  carSprite.position.x = intiialx;
  carSprite.position.y = initialy;
  carSprite.setSpeed(0, 270);
  speed = 0;
}

function draw() {
  drawSprites();
  text(score, x, y);
}

// function createCar() {

// }

function carMovement() {
  //Riley: Checks keyCodes for activity and changes car movement variables based on key presses
  if (keyIsDown(UP_ARROW)) {
    carSpeed += 0.5;
    //Riley: Limits speed to 3
    if (carSpeed > 3) {
      carSpeed = 3;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    carSpeed -= 0.5;
    //Riley: Stops car from driving backwards after deceleration
    if (carSpeed < 0) {
      carSpeed = 0;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    carAngle -= 0.2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    carAngle += 0.2;
  }

  //Riley: Applies carSpeed and carAngle to the sprite every time draw is called
  carSprite.setSpeed(carSpeed, carAngle);
  carSprite.rotateToDirection();
}

function createMap() {
  const mapSize = 500;
  const tileSize = mapSize / 10;

  createCanvas(mapSize, mapSize);
  grassGroup = new Group();
  // Tama: "Below reads the numbers in track.txt and inteprets them into individual sprite tiles."
  for (let i = 0; i < tracktxt.length; i++) {
    let trackCOORDS = tracktxt[i];
    for (let j = 0; j < tracktxt.length; j++) {
      if (trackCOORDS[j] == 0) {
        (grass = createSprite(
          (i * width) / trackCOORDS.length + tileSize / 2,
          (j * height) / trackCOORDS.length + tileSize / 2,
          tileSize,
          tileSize
        )),
          grass.addImage(grassImg);
        grass.scale = 0.5;
        grassGroup.add(grass);
      } else if (trackCOORDS[j] == 1) {
        road = createSprite(i * width);
      }
    }
  }
}
