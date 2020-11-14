let waves = []
let test
class WaveManager{
    constructor(data){
        this.playerMoney = 200000
        this.playerHealth = 100
        this.waveActive = false
        this.currentWave = 0
        this.currentEnemy = 0
        this.spawnTimer = 0
        this.spawnAt = 500
        this.spawnEnemy
        this.waves = data
    }

    spawnWave(){
        if(this.currentEnemy < this.waves[this.currentWave].length){
            if(this.spawnTimer >= this.spawnAt){
                this.spawnEnemy = new Enemy(this.waves[this.currentWave][this.currentEnemy])
                this.currentEnemy += 1
                this.spawnTimer = 0
                console.log(this.currentEnemy)

            } else {this.spawnTimer += deltaTime}
        } else if(liveEnemies.length == 0) {
            this.waveActive = false
            this.currentWave += 1
            this.currentEnemy = 0
        }
    }

    shopInfo(tower){
            textAlign(CENTER)
            stroke(0)
            fill(170,170,170,170)
            rectMode(CENTER)
            rect(W*.5,H*.90,W,150)
            fill(0)
            textSize(20)
            textStyle(BOLD)
            text(tower.name,W*.5,H*.85)
            textStyle(NORMAL)
            text("Price: $" + tower.towerCost,W*.4,H*.89)
            if(tower.towerCost <= game.playerMoney){
                fill(0,255,0)
            } else{fill(255,0,0)}
            text("You Have: $" + game.playerMoney,W*.6,H*.89)
            fill(0)
            text(tower.info,W*.5,H*.93)
            textAlign(LEFT)
            noStroke()
    }

    towerInfo(tower){
        textAlign(CENTER)
        stroke(0)
        fill(170,170,170,170)
        rectMode(CENTER)
        rect(W*.5,H*.90,W,150)
        fill(0)
        textSize(20)
        textStyle(BOLD)
        text(tower.name,W*.5,H*.85)
        textStyle(NORMAL)
        text("Range: " + tower.towerRange + " metres",W*.4,H*.89)
        text("Bullet Type: " + bulletTypes[tower.bulletType].name,W*.6,H*.89)
        fill(0)
        text("This tower has used "+ tower.shots + " " + bulletTypes[tower.bulletType].name + "s",W*.5,H*.93)
        textAlign(LEFT)
        noStroke()
    }

    isInfoShown(){
        if(activeElement instanceof Tower){
            if(selectedTower instanceof Tower && !selectedTower.isPurchased){
                activeElement = {}
                activeElement.sprite = inactive
            } else if(!activeElement.isPurchased){
                this.shopInfo(activeElement)
            }
        } else if(selectedTower instanceof Tower && selectedTower.isPurchased){
            this.towerInfo(selectedTower)
        }
    }
}