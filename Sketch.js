let player, bullet = [], enemy = [], particles = []
let colors = ['#ff0000', '#ff0000b3', '#78231eb3', '#57201db3', '#000000']
var timer = 0, timer = 0, moveSpeed = 4, playerReloadSpeed = 60*0.5, enemyReloadSpeed = 60*1.5, bulletSpeed = -8, hp = 3
var playerImg, bulletImg, heart, heart2, backgroundImg, enemiesImg = [], enemySound, gameOverSound, shootSound
var currentLvl = 1
const w = 700, rows = 15, tile = w / rows; 

//HTML
var startScreen = document.querySelector('#startScreen')
var title = document.querySelector('#title')
var lvl = document.querySelector('#lvl')
var score = document.querySelector('#score')
var startBtn = document.querySelector('#startBtn')
var lvlSelectBtn = document.querySelector('#lvlSelectBtn')
let levels = []

for (let i = 1; i <= 6; i++) //Lager refrence til alle knappene for å starte lvler
  levels.push(document.querySelector('#lvl'+ i))

var back = document.querySelector('#back')

function preload() { //Forhåndslaster alle bilder
  playerImg = loadImage('Img/player.png')
  bulletImg = loadImage('Img/bullet.png')
  heart = loadImage('Img/heart.png')
  heart2 = loadImage('Img/heart2.png')
  backgroundImg = loadImage('Img/background.png')
  enemySound = loadSound('Sound/enemySound.mp3')
  gameOverSound = loadSound('Sound/gameOver.wav')
  shootSound = loadSound('Sound/shoot.mp3')
  outputVolume(0.1)

  for (let i = 0; i < 5; i++)  //Laster alle bildene til enemies
    enemiesImg[i] = loadImage('Img/enemy'+(i+1)+'.png') 
  
}
function setup() {
  createCanvas(w, w);
  frameRate(60)
  player = new Player(width/2-10, height-32)
  generateLvl(3) //Lager bakgrundsbilet til menyen i starten 
  background(51)
  noLoop() //Gamet starter pauset
  
}
  
function draw() {
  image(backgroundImg, 0, 0, width, height) //Grå bakgrundsfarge
  UI()
  displayAndUpdate()
  shoot(player.pos.x + player.w/2, player.pos.y, bulletSpeed, false, playerReloadSpeed)
  enemyShoot()
  removeBullet()
  collision()
  removeParticles(0.5) //Fjernes etter x ant sekunder
  timer++
}

function shoot(x, y, bulletSpeed, isEnemyBullet, reload) { //Global skyte funksjon som funker både for player og enemy
  if (timer > 0 && timer%reload == 0)  //Skyter hvert x sekund
    bullet.push(new Bullet(x, y, bulletSpeed, isEnemyBullet))
}

function UI() {
  textSize(18)
  fill('#09171e')
  stroke(0)
  text('Level: ' + currentLvl, width - 80, height - 12)
  let size = tile/2;

  for (let i = 1; i <= hp; i++)  //Tegner hele hjerter 
    image(heart, size*i, height - size, size, size)

  if (hp <= 2 && hp >= 1) { //Tegner tomme hjerter motsatt som det over
    for (let i = 3; i >= hp; i--) {
      image(heart2, size*i, height - size, size, size)
    }
  }

  if (enemy.length <= 0) { //Victory screen
    startScreen.style = "display: flex; justify-content: center;"
    title.innerHTML = 'VICTORY!'
    startBtn.innerHTML = 'Replay Level'
    lvl.innerHTML = 'Level: ' + currentLvl
    lvl.style = "display: flex; justify-content: center;"
    let lastScore =  Math.round((timer/60) * 100) / 100 + "s"
    score.innerHTML = "Time: " + lastScore
    score.style = "display: flex; justify-content: center;"
    addScore(lastScore)
    noLoop()
  }

  if (hp == 0) { //Defeat screen
    startScreen.style = "display: flex; justify-content: center;"
    title.innerHTML = 'Defeat!'
    startBtn.innerHTML = 'Replay Level'
    lvl.innerHTML = 'Level: ' + currentLvl
    lvl.style = "display: flex; justify-content: center;"
    noLoop()
    outputVolume(1)
    gameOverSound.play()
    outputVolume(0.1)
  }
}

function generateLvl(currentLvl) {
  for (let i = 1; i <= 8; i++) {
    let setHP = currentLvl //Siden man tegner enemy i colonne 1, rad 1 først også col 2 -> col 3. hp på enemy(setHP) minsker hver gang man går ned en kollone. Så den første i raden har høyest verdi(hp) og misnker det med 1 per col
    for (let k = 1; k <= currentLvl; k++) {
      enemy.push(new Enemy(i*(tile + tile/5) + 80, k*(tile+(tile/8)), setHP, setHP-1))
      setHP-- //Neste col får mindre hp
    }
  }
}

function displayAndUpdate() {
  player.update()
  for (let i = 0; i < enemy.length; i++) 
    enemy[i].update()
  
  for (var i = 0; i < bullet.length; i++) 
    bullet[i].update()
  
  for (let i = 0; i < particles.length; i++) 
    particles[i].update()
  
}

startBtn.addEventListener('click', () => { //Start knapp. resetter alt og starter på current lvl
  bullet = [], enemy = [], particles = [], timer = 0
  player = new Player(width/2-10, height-32)
  
  generateLvl(currentLvl)
  startScreen.style = 'display: none'
	loop()
})

lvlSelectBtn.addEventListener('click', () => { //Level selector, fikser posisjon for knapper etc
  lvl1.style = 'display: flex; justify-content: center; width: 60px; height: 60px; float: left; margin-left: 25px; border-radius: 15px;'
  lvl2.style = 'display: flex; justify-content: center; width: 60px; height: 60px; float: left; margin-left: 25px; border-radius: 15px;'
  lvl3.style = 'display: flex; justify-content: center; width: 60px; height: 60px; float: left; margin-left: 25px; border-radius: 15px;'
  lvl4.style = 'display: flex; justify-content: center; width: 60px; height: 60px; float: left; margin-left: 25px; border-radius: 15px;'
  lvl5.style = 'display: flex; justify-content: center; width: 60px; height: 60px; float: left; margin-left: 25px; border-radius: 15px;'
  back.style = 'display: flex; justify-content: center; float: right; border-radius: 15px;'
  lvlSelectBtn.style = 'display: none'
  lvl.style = 'display: none'
  startBtn.style = 'display: none'
  score.style = "display: none"
  title.innerHTML = 'Select Level'
})

back.addEventListener('click', () => { //Tilbake knapp fra level selector
	title.innerHTML = 'Alien Invasion'
	title.style = 'display: flex; justify-content: center;'
  lvl1.style = 'display: none'
  lvl2.style = 'display: none'
  lvl3.style = 'display: none'
  lvl4.style = 'display: none'
  lvl5.style = 'display: none'
  back.style = 'display: none'
  startBtn.style = 'display: flex; justify-content: center;'
  lvlSelectBtn.style = 'display: flex; justify-content: center;'
  score.style = 'display: flex; justify-content: center;'
  lvl.style = 'display: flex; justify-content: center;'
})

for (let i = 0; i < levels.length; i++) //Looper igjennom alle lvler og lager knapp for de med en eventListner
  levels[i].addEventListener('click', () => addEvent(i+1))


function addEvent(lvl) { //Lvl x knapp. setter current lvl til x
  bullet = [], enemy = [], particles = [], timer = 0
  player = new Player(width/2-10, height-32)
  currentLvl = lvl
  hp = 3
  startScreen.style = 'display: none'
  generateLvl(currentLvl)
	loop()
}