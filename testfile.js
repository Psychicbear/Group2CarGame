gameData = loadJSON("data.JSON")

function setup(){
    enemyType = gameData.enemies
}

class liveEnemy {
    constructor(spriteIndex){
        this.sprite = createSprite(x,y,w,l)
        //Following line merges enemy type properties with the enemy sprite for convenience
        this.sprite = Object.assign(this.sprite, enemyType[spriteIndex])
    }
}

//sets up variables
let waves = []
let waveActive = false

//Loads the waves file
waveFile = loadStrings("waves.txt")

//Breaks up waves into individual enemies
waveFile.forEach(function(wave){
    splitWave = wave.split(" ")
    waves.push(splitWave)
})

function generateWave(){
    i = 0 //Possible issue calling i here so this may be changed
    if (waveActive){
        for(j=0;j<=waves[i].length;j++){ //Loops through enemies in wave
            enemy = new enemyClass(waves[i][j])//Generates the enemy
        }
        i++
    }
}