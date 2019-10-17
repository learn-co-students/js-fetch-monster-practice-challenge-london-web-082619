document.addEventListener("DOMContentLoaded", function(){
    getMonsters();
})

const mContainer = document.getElementById('monster-container')



function getMonsters(){
    return fetch("http://localhost:3000/monsters/?_limit=50")
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
}

function renderMonsters(monsters){
    monsters.forEach(function(monster){
        renderMonster(monster)
    })
}

function renderMonster(monster){
    let nameh2 = document.createElement('h2')
        nameh2.innerText = `Name: ${monster.name}`

    let ageP = document.createElement('h2')
        ageP.innerText = `Age: ${monster.age}`

    let descriptionP = document.createElement('p')
        descriptionP.innerText = `Description: ${monster.description}`

    let br = document.createElement('br')

    mContainer.append(nameh2, ageP, descriptionP, br)
}

const monsterForm = document.getElementById('new-monster-form')
monsterForm.addEventListener('submit', function(event){
    console.log('submitted form')
    event.preventDefault();
    addNewMonster({
        name: event.target[0].value,
        description: event.target[1].value,
        age: event.target[2].value
    })
})

function addNewMonster(newMonster){
    console.log(newMonster)
    postMonster(newMonster)
    .then(monster => renderMonster(monster))
}


function postMonster(newMonster){
    return fetch("http://localhost:3000/monsters/", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(newMonster)
    }).then(resp => resp.json())
}

let next50 = document.getElementById('Next-50')
next50.addEventListener('click', function(){
    while(mContainer.hasChildNodes()){
        mContainer.removeChild(mContainer.lastChild);
    }
    return fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
})