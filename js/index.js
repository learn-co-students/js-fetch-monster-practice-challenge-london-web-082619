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



function buildMonsterForm() {

    monsterForm = document.createElement('form');
    monsterForm.id = 'monster-form';
    createMonster.appendChild(monsterForm);

    nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.placeholder = 'Name';
    monsterForm.appendChild(nameInput);

    ageInput = document.createElement('input');
    ageInput.id = 'age';
    ageInput.placeholder = 'Age';
    monsterForm.appendChild(ageInput);

    descriptionInput = document.createElement('input');
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Description';
    monsterForm.appendChild(descriptionInput);

    button = document.createElement('button');
    button.innerText = 'Create'
    monsterForm.appendChild(button);
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

