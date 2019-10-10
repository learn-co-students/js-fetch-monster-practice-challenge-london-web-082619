const monsterUrl='http://localhost:3000/monsters'; 
const monsterContainer = document.getElementById('monster-container');
let monsterArray = [];


document.addEventListener('DOMContentLoaded', ()=>{
    createMonsterForm();
    let start = 0;
    let end = 50;
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');

    backButton.addEventListener('click', lastFiftyMonsters);
    forwardButton.addEventListener('click', nextFiftyMonsters);

    fetchMonsters();

    function fetchMonsters(){
        fetch(monsterUrl)
            .then(resp => {return resp.json()})
            .then(json => {
                monsterArray = [];
                monsterArray.push(...json);
                showFiftyMonsters();
            })
    };
    
    function showFiftyMonsters(){
        monsterArray.slice(start, end).forEach(monster => showMonster(monster))
    };
    
    function showMonster(monster){
        const monsterItem = document.createElement('div')
        const monsterName = document.createElement('h2')
        const monsterAge = document.createElement('h4')
        const monsterDesc = document.createElement('p')
    
        monsterContainer.appendChild(monsterItem);
        monsterItem.appendChild(monsterName);
        monsterItem.appendChild(monsterAge);
        monsterItem.appendChild(monsterDesc);

        monsterName.innerHTML = monster.name;
        monsterAge.innerHTML = monster.age;
        monsterDesc.innerHTML = monster.description;
    };


    function lastFiftyMonsters(){
        if (start >= 50){
            deleteMonsters();
            start -= 50;
            end -= 50;
            showFiftyMonsters();
        }
    };

    function nextFiftyMonsters(){
        if (end < monsterArray.length){
            deleteMonsters();
            start += 50;
            end += 50;
            showFiftyMonsters();
        }
    };

    function deleteMonsters(){
        while (monsterContainer.hasChildNodes()){
            monsterContainer.removeChild(monsterContainer.firstChild);
        }
    };

    function createMonsterForm(){
        const a=document.createElement('form');
        const b=document.createElement('input');
        const c=document.createElement('input');
        const d=document.createElement('input');
        const e=document.createElement('button');
    
        c.type='number';
    
        a.id='monster-form';
        b.id='name';
        c.id='age';
        d.id='description';
    
        b.placeholder='name';
        c.placeholder='age';
        d.placeholder='description';
        e.innerHTML='Create'
    
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
        a.appendChild(e);
    
        document.getElementById('create-monster').appendChild(a);
        a.addEventListener('submit', addMonster)
    };

    function addMonster(e){
        e.preventDefault();
        const newName = e.target[0].value;
        const newAge = e.target[1].value;
        const newDesc = e.target[2].value;
        postMonster(newName, newAge, newDesc)
            .then(fetchMonsters);
        e.target[0].value="";
        e.target[1].value="";
        e.target[2].value="";
    };

    function postMonster(name, age, decription){
        return fetch(monsterUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: description,
            })
        })
    };

})