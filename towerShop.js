let shopTowers = [];

class Shop {
  constructor() {
    this.shopContainer = { x: W * 0.9, y: H / 4, w: W * 0.1, h: H * 0.5 };
    this.button = createSprite(
      this.shopContainer.x - 13,
      this.shopContainer.y + 25,
      25,
      50
    );
    this.buffer;
    this.buttonCheck = 1;
    this.button.buffer = 100;
    this.button.timer = 0;
    this.towersDrawn = false;
    this.button.setCollider("rectangle");
    this.isOpen = true;
    shopGroup.add(this.button);
  }

  drawShop() {
    //When the shop is open
    if (this.isOpen) {
      //Draw shop menu
      this.button.position.x = this.shopContainer.x - 13;
      rectMode(CORNER);
      fill(255, 255, 255, 150);
      stroke(0);
      rect(
        this.shopContainer.x,
        this.shopContainer.y,
        this.shopContainer.w,
        this.shopContainer.h
      );
      this.drawTowerContainer();
      fill(255);
      textSize(20);
      textFont(newFont);
      text("Shop", this.shopContainer.x + 40, this.shopContainer.y + 30);
      if (!this.towersDrawn) {
        //this.towersDrawn = true
      }
    } else if (!this.isOpen) {
      this.button.position.x = W - 13;
      shopTowers.forEach(function (tower) {
        tower.sprite.remove();
      });
      shopTowers = [];
    }
  }

  drawTowerContainer() {
    rectMode(CENTER);
    this.towerContainer = createVector(
      this.shopContainer.x + 35,
      this.shopContainer.y + 75
    );
    for (let i = 0; i < towerTypes.length; i++) {
      if (i % 2 == 0) {
        rect(this.towerContainer.x, this.towerContainer.y, 50);
        text(i, this.towerContainer.x, this.towerContainer.y);
        this.drawShopTower(i);
        this.towerContainer.x += 60;
        this.towerContainer.y = this.shopContainer.y + 75;
      } else {
        rect(this.towerContainer.x, this.towerContainer.y, 50);
        text(i, this.towerContainer.x, this.towerContainer.y);
        this.drawShopTower(i);
        this.towerContainer.x = this.shopContainer.x + 35;
        this.towerContainer.y += 60;
      }
    }
  }

  drawShopTower(index) {
    if (shopTowers[index] == null) {
      this.buffer = new Tower(this.towerContainer.x, this.towerContainer.y, index);
      shopGroup.add(this.buffer.sprite);
      shopTowers.splice(index, 0, this.buffer);
    } else if (shopTowers[index].id != index) {
      this.buffer = new Tower(this.towerContainer.x, this.towerContainer.y, index);
      shopGroup.add(this.buffer.sprite);
      shopTowers.splice(index, 0, this.buffer);
    } else {
    }
  }

  shopButton() {
    if (this.button.mouseIsOver) {
      cursor(HAND);
    }
    if (this.button.mouseIsPressed) {
      this.buttonCheck++;
      shopclick.play();
    }
    if (this.buttonCheck % 2 == 0) {
      this.isOpen = false;
      this.button.position.x = W - 13;
    } else {
      this.isOpen = true;
      this.button.position.x = this.shopContainer.x - 13;
      this.buttonCheck = 1;
    }
    this.button.mouseUpdate();
  }
}
