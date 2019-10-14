const BASE_URL = 'http://localhost:3000/monsters'
let currentPage= 1;

const getMonsters = (page) => {
    return fetch(`${BASE_URL}/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsterData => handleMonsterData(monsterData))
}

const postMonster = (event) => {
    debugger
    return fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            "name": event.target.name.value, 
            "age": event.target.name.value, 
            "description": event.target.name.value,
        })
    }).then(response => response.json)
      .catch(console.log)
}

const handleMonsterData = (monsterData) => {
    monsterData.forEach(monster => {
        renderMonster(monster);
    })
}

const renderMonster = (monster) => {
    let monsterContainer = document.getElementById("monster-container");
    let name = createName(monster);
    let age = createAge(monster);
    let description = createDescription(monster);

    monsterContainer.appendChild(name);
    monsterContainer.appendChild(age);
    monsterContainer.appendChild(description);
}

const createName = (monster) => {
    let name = document.createElement("h2")
    name.textContent = monster.name
    return name
}

const createAge = (monster) => {
    let age = document.createElement("p")
    age.textContent = monster.age
    return age
}

const createDescription = (monster) => {
    let description = document.createElement("p")
    description.textContent = monster.description
    return description
}

const createPreviousPageButton = () => {
    let backButton = document.getElementById("back");
    backButton.addEventListener("click", handlePreviousPage);
}

const clearPage = () => {
    const monsterContainer = document.getElementById("monster-container")
    for (const mainNode of monsterContainer.childNodes) {
        for (const subNode of mainNode.childNodes){
            subNode.remove();
        }
    }
}

const handlePreviousPage = () => {
    if (currentPage == 1){
        return;
    } else {
        currentPage -= 1;
        clearPage();
        getMonsters(currentPage);
    }
}

const createNextPagebutton = () => {
    let nextButton = document.getElementById("forward");
    nextButton.addEventListener("click", handleNextPage);
}

const handleNextPage = () => {
    currentPage += 1;
    clearPage();
    getMonsters(currentPage);
}

const createSubmitFunction = () => {
    submitForm = document.getElementById("monster-form")
    submitForm.addEventListener("submit", handleMonsterSubmit)
}

const handleMonsterSubmit = (event) => {
    event.preventDefault()
    // debugger;
    postMonster(event);
    
}


getMonsters(currentPage);
createPreviousPageButton();
createNextPagebutton();
createSubmitFunction();