const friction = 0.98
class Particles {
  constructor(x, y, c, t) {
    this.pos = {x, y}
    this.vel = {x: random(-1,1)*4, y: random(0,1)*4} 
    this.r = random(2,4)
    this.color = c
    this.timer = t
  }

  update() {
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
    fill(255)


    this.vel.x *= friction
    this.vel.y *= friction
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
}

function addParticles(x, y, farge, tid) {
  for (let i = 0; i <= 15; i++) 
    particles.push(new Particles(x, y, farge, tid))
  
}

function removeParticles(sekunder) {
  for (let i = 0; i < particles.length; i++) {
    if (timer > particles[i].timer + (sekunder*60)) {
      particles.splice(i, 1)
    }
  }
}