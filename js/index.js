const monsterContainer = document.querySelector("#monster-container");
const createMonster = document.querySelector("#create-monster");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");
let currentPage = 1;
const URL = `http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`;

function createForm(){
    const formMonster = document.createElement("form");
    const nameForm = document.createElement("input");
    const ageForm = document.createElement("input");
    const descForm = document.createElement("input");
    const submitButton = document.createElement("input");

    submitButton.setAttribute("type", "submit");
    ageForm.type = 'number';

    formMonster.append(nameForm, ageForm, ageForm, descForm, submitButton)
    createMonster.append(formMonster);

    nameForm.placeholder = "name...";
    ageForm.placeholder = 'age...';
    descForm.placeholder = 'description...';
    submitButton.value = 'Create';
    createMonster.addEventListener("submit", (e) => postMonster(e))
}


function postMonster(e) {
    e.preventDefault();
    fetch("http://localhost:3000/monsters" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: e.target[0].value,
            age: e.target[1].value,
            description: e.target[2].value})
    })
        .then(resp => resp.json())
        .catch(err => console.log(err))
}

function getMonsters(currentPage){
    fetch(URL)
    .then(resp => resp.json())
    .then(json => eachMonster(json))
}

function eachMonster(monsters){
   monsters.forEach(monster => showMonsters(monster))
    }

function showMonsters(monster){
    const name = document.createElement("h3");
    const age = document.createElement("h4");
    const desc = document.createElement("p");

    monsterContainer.append(name, age, desc);

    name.innerText = monster.name;
    age.innerText = `Age: ${monster.age}`;
    desc.innerText = `Bio: ${monster.description}`;

}

forwardButton.addEventListener("click", forwardButtonPress);

function forwardButtonPress(){
    clearMonsters(); 
    getMonsters(currentPage++);
}

backButton.addEventListener("click", backButtonPress);

function backButtonPress(){
    clearMonsters();
    getMonsters(currentPage--);

}

function clearMonsters(){
    while (monsterContainer.hasChildNodes()) {
        monsterContainer.removeChild(monsterContainer.lastChild);
    }  
}

getMonsters();
createForm();