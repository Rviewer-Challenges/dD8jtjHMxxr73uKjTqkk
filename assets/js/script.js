const gameboard = document.getElementById('gameboard')
const difficultBox = document.getElementById('difficultBox')
const scoreboard = document.getElementById('scoreboard')
const modal = new bootstrap.Modal(document.getElementById("modal"))
const modalBody = document.getElementById("modalBody")
const move = document.getElementById('move')
const time = document.getElementById('time')
const pair = document.getElementById('pair')

let emotes = []
let cardsPicked = []
let timeoutID = undefined
let counter = 59
let moveCounter = 0
let pairLeft = 0

function setEmotes() {
    emotes = [
        './assets/images/diana.webp',
        './assets/images/ezreal.webp',
        './assets/images/nautilus.webp',
        './assets/images/riven.webp',
        './assets/images/sona.webp',
        './assets/images/teemo.webp',
        './assets/images/galacticcat.webp',
        './assets/images/leona.webp',
        './assets/images/lucian.webp',
        './assets/images/zilean.webp',
        './assets/images/nunu.webp',
        './assets/images/sett.webp',
        './assets/images/vex.webp',
        './assets/images/rammus.webp',
        './assets/images/ziggs.webp',
    ]
}

function generate(number) {
    setGame()
    setEmotes()
    cardsPicked = []
    let cards = []
    pair.innerHTML = `Pair: ${number / 2}`
    pairLeft = number / 2
    
    for (let i = 0; i < number; i++) {
        cards.push(`
        <div class="cardArea" onclick="pickCard(${i})">
            <div class="card" id="card${i}">
                <div class="face lower" id="lower${i}">
                    <img src="${emotes[0]}" alt="">
                </div>
                <div class="face upper">
                    <img src="./assets/images/poro.webp" alt="">
                </div>
            </div>
        </div>
        `)
        if(i % 2 == 1) emotes.splice(0,1)  
    }
cards.sort(()=> Math.random() - .5)
    gameboard.innerHTML = cards.join(' ')
}

function pickCard(index) {
    move.innerHTML = `Moves: ${++moveCounter}`
    let card = document.getElementById("card" + index)

    if(card.style.transform != 'rotateY(180deg)'){
        card.style.transform = 'rotateY(180deg)'
        cardsPicked.push(index)
    }
    if (cardsPicked.length == 2) {
        unpick(cardsPicked)
        cardsPicked = []
    }
}

function unpick(cardsPicked) {
    setTimeout(() => {
        let lower1 = document.getElementById(`lower${cardsPicked[0]}`)
        let lower2 = document.getElementById(`lower${cardsPicked[1]}`)

        if (lower1.innerHTML != lower2.innerHTML) {
            let card1 = document.getElementById(`card${cardsPicked[0]}`)
            let card2 = document.getElementById(`card${cardsPicked[1]}`)
            card1.style.transform = 'rotateY(0deg)'
            card2.style.transform = 'rotateY(0deg)'

        }else{
            lower1.style.background = 'lightblue'
            lower2.style.background = 'lightblue'
            pair.innerHTML = `Left: ${--pairLeft}`
            if(pairLeft == 0) gameOver()
        }
    }, 1000);
}

function setGame() {
    difficultBox.classList.add('hide')
    scoreboard.classList.remove('hide')

    startTimer()
}

function backToDifficultSelection() {
    difficultBox.classList.remove('hide')
    scoreboard.classList.add('hide')
    cancelTimeout()
    counter = 59
    time.innerHTML = `Time: 1:00`
    moveCounter = 0
    move.innerHTML = `Moves: ${moveCounter}`
    gameboard.innerHTML = ''
}

function startTimer() {
    console.log('running')
    if(typeof timeoutID != undefined){
        cancelTimeout()
    }

    timeoutID = setTimeout(() => {
        if(counter != 0){
            startTimer()
        }else{
            cancelTimeout()
            gameOver()
        }
        time.innerHTML = `Time: ${counter--}`
    }, 1000);
}

function cancelTimeout() {
    clearTimeout(timeoutID)
    timeoutID = undefined
}

function gameOver() {
    modalBody.innerHTML = `
    <h5 class="text-dark fw-600 text-center">¡¡¡Thanks for playing!!!</h5>
    <p class="mt-1 text-dark fw-600 text-center">Moves: ${moveCounter}</p>
    <p class="mt-1 text-dark fw-600 text-center">Left: ${pairLeft}</p>
    `
    modal.show()
}