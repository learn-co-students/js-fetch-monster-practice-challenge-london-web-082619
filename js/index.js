
document.addEventListener('DOMContentLoaded',()=>{
    monsterForm();
    renderMonsters();
})

function renderMonsters(){
    api.getMonsters().then(monster => createAllMonstersElement(monster))
}
function createAllMonstersElement(arrayOfMonsters){
    arrayOfMonsters.forEach(element => {
        createMonsterElement(element);
    });
}

function createMonsterElement(monsterObject){
    const monsterContainer = document.querySelector('#monster-container');
    monsterContainer.dataset.id = monsterObject.id

    let h2 = document.createElement('h2');
    h2.innerText = `${monsterObject.name}`;
    let h4 = document.createElement('h4');
    h4.innerText = `${monsterObject.age}`;
    let p = document.createElement('p');
    p.innerText = `${monsterObject.description}`;

    monsterContainer.append(h2, h4, p)
}

const btnBack = document.querySelector('#back');
const btnForward = document.querySelector('#forward');
    
btnBack.addEventListener('click',e => {
    document.querySelector('#monster-container').innerHTML = "";
    pageNum--;
    renderMonsters();
})
btnForward.addEventListener('click',e => {
    pageNum++;
    document.querySelector('#monster-container').innerHTML = "";
    renderMonsters();
})

const postTheMonsterData = e => {
    e.preventDefault();
    api.postMonster().then(renderMonsters())
}

function monsterForm(){
    const form = document.createElement('form');
    form.id = "monster-form";
    form.innerHTML = `
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <input type="submit" name= "submit" value="Create" id="submit">
    `

    const div = document.querySelector('#create-monster');
    div.append(form);
    
    form.addEventListener('submit', e =>{
        e.preventDefault()
        addMonster()
        form.reset()
        renderMonsters()
    })
}
function addMonster(){
    const name = document.querySelector('#name').value, age = document.querySelector('#age').value, description = document.querySelector('#description').value;
        return fetch("http://localhost:3000/monsters",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, age, description})
        })
}


