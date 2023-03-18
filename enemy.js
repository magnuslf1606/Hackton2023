class Enemy {
  constructor(x, y, hp, image) {
    this.pos = {x, y}
    this.w = tile
    this.h = this.w
    this.vel = {x: 1, y: 0}
    this.isGoingRight = true
    this.erNederst = false
    this.hp = hp
    this.image = image
  }
  update() {
    stroke(0)
    image(enemiesImg[this.image], this.pos.x, this.pos.y, this.w, this.h) //Får riktig bilet fra array
    fill(255)
    noStroke()


    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.checkOffScreen()
    checkNederst(currentLvl)
  }

  checkOffScreen() {
    if (this.pos.x + this.w >= width - 10 && this.isGoingRight) { //Treffer høyre så snur den retning
      this.vel.x *= -1
      this.isGoingRight = false
    }
    if (this.pos.x <= 0 && !this.isGoingRight) { //Treffer venstre så snur den retning
      this.vel.x *= -1
      this.isGoingRight = true
    }
  }
}

function checkNederst(lvl) { //Finner den nederste på hver rad når de spawner inn. Ser på hvilken lvl man er på og bestemmer utifra det. Bare de nederste skyter
  let help = 0
  if (lvl<=1) { //Hvis lvl er mindre enn 1 så må man minuse 1 for at de skal skyte
    help = 1
  }
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].pos.y > (lvl-help)*enemy[i].h) { //Hvis y > høyden på hver enemy * hvilken lvl man er på så blir den nederste raden erNederst = true
      enemy[i].erNederst = true
    }   
  }
}

function enemyShoot() {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].erNederst) { //Bare de nederste skyter
      shoot(enemy[i].pos.x + enemy[i].w/2, enemy[i].pos.y + enemy[i].h + 5, -bulletSpeed-6, true, enemyReloadSpeed)
    }
  }
}