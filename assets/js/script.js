const gameboard = document.getElementById('gameboard');
let cards = [];
const emotes = [
    './assets/images/diana.webp',
    './assets/images/ezreal.webp',
    './assets/images/galacticcat.webp',
    './assets/images/leona.webp',
    './assets/images/lucian.webp',
    './assets/images/nautilus.webp',
    './assets/images/nunu.webp',
    './assets/images/poro.webp',
    './assets/images/rammus.webp',
    './assets/images/riven.webp',
    './assets/images/sett.webp',
    './assets/images/sona.webp',
    './assets/images/teemo.webp',
    './assets/images/vex.webp',
    './assets/images/zilean.webp',
]

function easy() {
    let counter = 0;
    const newEmotes = emotes.splice(0,8);
    console.log(newEmotes)
    for (let i = 1; i < 5; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('rowContainer');
        for (let j = 1; j < 5; j++) {
            counter == 7 ? counter = 0 : counter++;
            let td = document.createElement('td');
            let card = document.createElement('div');
            let img = document.createElement('img');
            img.src = newEmotes[counter];
            td.classList.add('cardContainer');
            img.setAttribute('id', `card${i}x${j}`);
            img.style = 'opacity:0';
            img.classList.add('img');
            card.classList.add('card');
            card.append(img);
            td.append(card);
            img.addEventListener('click', (ev)=>{selected(ev)})
            tr.append(td);
        }
        
        gameboard.append(tr);
    }
}

function selected({target: {id, src}}) {
    let timer;
    const card = document.getElementById(id);
    card.classList.add('flip');

    if (cards.length == 1){
        if(cards[0].src == src) {
            console.log('ARE SAME')
        }else {
            const prevcard = document.getElementById(cards[0].id);
            const card = document.getElementById(id);
            clearTimeout(timer)
            timer = setTimeout(() => {
                console.log('yayayaju')
                prevcard.classList.remove('flip');
                card.classList.remove('flip');
            }, 1600);
        };
        cards = []
        return;
    };
    cards.push({id, src})
}