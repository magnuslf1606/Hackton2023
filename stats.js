var highScores = JSON.parse(localStorage.getItem('highScores')) || []

function addScore(score) {
  //Adder score til highScore array
  highScores.push(score)
  localStorage.setItem('highScores', JSON.stringify(highScores))
}


function loadHighScores() {
  var scores = document.querySelector('#scores')
  const tbl = document.createElement('table')

  highScores.sort( (a, b) => b - a)
  let count = 0
  for (let i = highScores.length-1; i >= 0; i--) {
    count++
    const tr = tbl.insertRow()
    const td = tr.insertCell()
    td.appendChild(document.createTextNode(count+".  -- " + highScores[i] + "s"))
  }
  if (scores) //Hvis score er ett object altså != null/undefined
    scores.appendChild(tbl)
  
  var button = document.createElement('button')
  button.innerText = "Back To Game"
  button.classList.add("button")
  if (scores)
    scores.appendChild(button)

  button.addEventListener('click', () => document.location.href = "http://127.0.0.1:5500/index.html")
}

loadHighScores()