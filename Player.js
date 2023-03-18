class Player {
  constructor(x,y) {
    this.pos = {x, y}
    this.w = tile
    this.h = this.w/1.372
    this.vel = 0
  }
  
  update() {
    image(playerImg, this.pos.x, this.pos.y, this.w, this.h)
    this.pos.x += this.vel
    this.movment()
  }
  movment() {
    if (key.pressed.right) { //Høyre og venstre bevegelse 
      player.vel = moveSpeed
    } else if (key.pressed.left) {
      player.vel = -moveSpeed
    } else player.vel = 0

    if (player.pos.x <= 0 && key.pressed.left) { //Kan ikke gå offscreen
      player.vel = 0
      player.pos.x = 0
    } else if (player.pos.x + player.w >= width && key.pressed.right) {
      player.vel = 0
      player.pos.x = width - player.w
    }
  }
}
const key = {
  pressed: {
    right: false
  },
  pressed: {
    left: false
  }
}

addEventListener('keydown', ({keyCode}) => {
  switch(keyCode) {
    case 39: //Right
    case 68:
      key.pressed.right = true
      break

    case 37: //Left
    case 65:
      key.pressed.left = true
      break
  }
})

addEventListener('keyup', ({keyCode}) => {
  switch(keyCode) {
    case 39: //Right
    case 68:
      key.pressed.right = false
      break

    case 37: //Left
    case 65:
      key.pressed.left = false
      break
  }
})