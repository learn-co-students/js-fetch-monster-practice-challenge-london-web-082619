let editButtons = []
let monsterArray = []
window.addEventListener('DOMContentLoaded', (event) => {
  
    const monsterContainer = document.getElementById('monster-container')
    const formContainer = document.getElementById('create-monster')
    const next = document.getElementById('forward')
    const previous = document.getElementById('back')
    const monsterUrl = 'http://localhost:3000/monsters'


    function createMonsterForm() {
        const form = document.createElement('form')
        const name = document.createElement('input')
        const age = document.createElement('input')
        const desc = document.createElement('textarea')
        const submit = document.createElement('input')

        form.id = "monster-form"
        name.id = "monster-name"
        age.id = "monster-age"
            age.type = 'number'
        desc.id = "monster-description"
        submit.type = 'submit'

        name.placeholder = 'Name your Monster'
        age.placeholder = "How old is your monster?"
        desc.placeholder = "Describe your fearsome monster!"

        form.appendChild(name)
        form.appendChild(age)
        form.appendChild(desc)
        form.appendChild(submit)
        formContainer.appendChild(form)
        form.addEventListener('submit', postMonster)

    }
    function postMonster(e) {
        e.preventDefault();
        const newMonsterName = e.target[0].value;
        const newMonsterAge = e.target[1].value;
        const newMonsterDesc = e.target[2].value;
        postToDatabase(newMonsterName, newMonsterAge, newMonsterDesc)
            .then(fetchMonsters)
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
    }

    function postToDatabase(name, age, desc) {
        return fetch( monsterUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify( {
              name: name,
              age: age,
              description: desc
            } )
          } )
    }
    

    function fetchMonsters() {
        fetch(monsterUrl)
            .then(resp => resp.json())
            .then(json => {
                monsterArray = [];
                monsterArray.push(...json)})
            .then(displayMonsters)
            .then(createButtons)
                
    }

    function createButtons() {
        editButtons = [...document.getElementsByClassName('edit-button')];

        editButtons.forEach( button => {
        button.addEventListener('click', editMonster)
            })
    }
    let spliceStart = 0
    let spliceEnd = 50

    function displayMonsters() {
        while (monsterContainer.hasChildNodes()) {
            monsterContainer.removeChild(monsterContainer.firstChild);
        }
        monsterArray.slice(spliceStart,spliceEnd).forEach( monster => createMonster(monster))
    }

    function next50() {
        if (spliceEnd < monsterArray.length) {
            spliceStart += 50;
            spliceEnd += 50;
            displayMonsters();
        }
    }

    function previous50() {
        if (spliceStart > 1) {
            spliceStart += 50;
            spliceEnd += 50;
            displayMonsters();
        }
    }
    
    function createMonster(monster) {
        let monsterItem = document.createElement('div')
        let monsterName = document.createElement('h2')
        let monsterAge = document.createElement('h4')
        let monsterDesc = document.createElement('p')
        let editButton = document.createElement('button')
        
        monsterContainer.appendChild(monsterItem);
        monsterItem.appendChild(monsterName);
        monsterItem.appendChild(monsterAge);
        monsterItem.appendChild(monsterDesc);
        monsterItem.appendChild(editButton)

        monsterName.innerText = monster.name;
        monsterAge.innerText = monster.age;
        monsterDesc.innerText = monster.description;
        editButton.innerText = `Edit ${monster.name}`;
        editButton.className = `edit-button`
        editButton.type = 'submit'
        editButton.id = monster.id
    }

    createMonsterForm()
    fetchMonsters()
   

    function editMonster(e) {
        e.preventDefault()
        console.log(e.target.id)
    }

    next.addEventListener('click', next50)
    previous.addEventListener('click', previous50)




});