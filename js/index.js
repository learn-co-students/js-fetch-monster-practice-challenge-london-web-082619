
document.addEventListener("DOMContentLoaded", () => {
    renderMonsters()
    createForm()
    createLoadButton()
})

// CONSTANTS

monsterContainerDiv = document.querySelector('#monster-container')
createMonsterDiv = document.querySelector('#create-monster')
forwardButton = document.querySelector('#forward')
backButton = document.querySelector('#back')
let currentPage = 0
let limit = 50


// FUNCTIONALITY

function renderMonsters(){
    API.get(1).then(monsters => {
        monsters.forEach(monster => {
        renderSingle(monster)
     })
     currentPage = 1;
    })
}

function renderSingle(monster){
    
    monsterDiv = document.createElement('div')
    // monsterDiv.id = monster.id

    h2 = document.createElement('h2')
    h2.innerText = monster.name

    p1 = document.createElement('p')
    p1.innerText = `Age: ${monster.age}`

    p2 = document.createElement('p')
    p2.innerText = `Description: ${monster.description}`

    monsterDiv.append(h2, p1, p2)
    monsterContainerDiv.appendChild(monsterDiv)

}

function createForm(){
    form = document.createElement('form')
}

// PAGE FORWARD & BACKWARD

forwardButton.addEventListener('click', () => forwardPage())
backButton.addEventListener('click', () => backPage())

function forwardPage(){
    monsterContainerDiv.innerText=""
    API.get(currentPage+1).then(monsters => {
        monsters.forEach(monster => {
        renderSingle(monster)
     })
     currentPage++ 
    })
}

function backPage(){
    if(currentPage<2){alert('you\'r on the first page!')}
    else{
    monsterContainerDiv.innerText=""
    API.get(currentPage-1).then(monsters => {
        monsters.forEach(monster => {
            renderSingle(monster)
        })
        currentPage--
    })
}
}


// SUBMIT FUNCTIONALITY

function createForm(){
    form = document.createElement('form')
    form.id = 'monster-form'
    form.addEventListener('submit', (e) => formSubmit(e))

    nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.placeholder = 'Name'
    ageInput = document.createElement('input')
    ageInput.id = 'age'
    ageInput.placeholder = 'Age'
    descriptionInput = document.createElement('input')
    descriptionInput.id = 'description'
    descriptionInput.placeholder = 'Description'
    button = document.createElement('button')
    button.innerText = 'Submit'

    form.append(nameInput, ageInput, descriptionInput, button)
    createMonsterDiv.append(form)
}

function formSubmit(e){
    e.preventDefault();
    console.log(e);
    let name = e.target.elements[0].value
    let age = e.target.elements[1].value
    let description = e.target.elements[2].value

    let submitData = {name, age, description}

    post(submitData) //backend
    renderSingle(submitData) //frontend
}


// Load button

function createLoadButton(){
    loadButton = document.createElement('button')
    loadButton.innerText = 'Load more'
    loadButton.addEventListener('click', () => loadMore())
    document.body.appendChild(loadButton)
}

function loadMore(){

    API.get(1, limit+50).then(monsters => {
        monsters.forEach(monster => {
        renderSingle(monster)
     })
     currentPage = 1;
     limit + 50
    })
}