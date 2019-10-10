console.log('Welcome to Monstr Inc!')

const monstersURL = 'http://localhost:3000/monsters';
const createMonster = document.getElementById('create-monster');
const monsterContainer = document.getElementById('monster-container')

const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');

let pageNumber = 1;

document.addEventListener('DOMContentLoaded', () => {
    buildMonsterForm();
    getMonsters(pageNumber);

    forwardButton.addEventListener('click', goForwardOnePage);
    backButton.addEventListener('click', goBackOnePage);

})

function createNewMonster(event) {
    event.preventDefault()

    let monsterForm = document.getElementById(`monster-form`);
    
    let monsterFormData = {
        name: monsterForm.name.value,
        age: monsterForm.age.value,
        description: monsterForm.description.value
    }

    let configObject = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(monsterFormData)
    }

    fetch(monstersURL, configObject)
        .then(response => response.json())
        .then(monster => renderMonster(monster)) 
        .catch(function(error){
            console.log(error.message);
        })
}

function buildMonsterForm() {

    let monsterForm = document.createElement('form');
    monsterForm.id = 'monster-form';
    createMonster.appendChild(monsterForm);

    let nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.placeholder = 'Name';
    monsterForm.appendChild(nameInput);

    let ageInput = document.createElement('input');
    ageInput.id = 'age';
    ageInput.placeholder = 'Age';
    monsterForm.appendChild(ageInput);

    let descriptionInput = document.createElement('input');
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Description';
    monsterForm.appendChild(descriptionInput);

    let button = document.createElement('input');
    button.type = 'submit'
    button.innerText = 'Create'
    monsterForm.appendChild(button);

    monsterForm.addEventListener('submit', createNewMonster)
}

function getMonsters(pageNumber) {
    fetch(monstersURL + `?_limit=50&_page=${pageNumber}`)
        .then(response => response.json())
        .then(monsters => renderMonsters(monsters));
}

function renderMonsters(monsters) {
    monsters.forEach(monster => {
        renderMonster(monster);
    })
}

function renderMonster(monster) {
    // Create container to hold the new monster data
    newMonsterContainer = document.createElement('div');
    newMonsterContainer.id = monster.name;
    monsterContainer.appendChild(newMonsterContainer);

    // Add attributes to the monster container
    monsterName = document.createElement('h3');
    monsterName.innerText = monster.name;
    monsterContainer.appendChild(monsterName);

    monsterAge = document.createElement('p');
    monsterAge.innerText = `Age: ${monster.age}`;
    monsterContainer.appendChild(monsterAge);

    monsterDescription = document.createElement('p');
    monsterDescription.innerText = `Description: ${monster.description}`;
    monsterContainer.appendChild(monsterDescription);
}

function goForwardOnePage() {
    pageNumber += 1;
    monsterContainer.innerText = "";
    getMonsters(pageNumber);
}

function goBackOnePage() {
    pageNumber -= 1;
    monsterContainer.innerText = "";
    getMonsters(pageNumber);
}

