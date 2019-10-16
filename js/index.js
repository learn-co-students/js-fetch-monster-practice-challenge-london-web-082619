
const populateMonsters = () => {
    api.getMonsters().then(renderMonsters)
}

const renderMonsters = monsters => {
    const monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ""

    for (const monster of monsters) {
        const monsterDiv = document.createElement("div")
        monsterContainer.appendChild(monsterDiv)

        const monsterH2 = document.createElement("h2")
        monsterH2.innerText = monster.name
        monsterContainer.appendChild(monsterH2)

        const monsterH4 = document.createElement("h4")
        monsterH4.innerText = monster.age
        monsterContainer.appendChild(monsterH4)

        const monsterP = document.createElement("p")
        monsterP.innerText = monster.description
        monsterContainer.appendChild(monsterP)
    }

}

const clickNext = document.querySelector('#forward')
clickNext.addEventListener("click", () => nextPage())

const nextPage = () => {
    page++
    populateMonsters()
}

const clickBack = document.querySelector('#back')
clickBack.addEventListener("click", () => backPage())

const backPage = () => {
    if (page > 1) {
        page--
        populateMonsters()
    } else {
        alert("There are no more monsters back there!")
    }
    
}

const findCreateMonster = document.querySelector('#create-monster')

const renderCreateMonster = () => {
    const form = document.createElement("form")
    form.id = "monster-form"
    findCreateMonster.appendChild(form)

    const inputName = document.createElement("input")
    inputName.id = "name"
    inputName.placeholder = "name..."
    form.appendChild(inputName)

    const inputAge = document.createElement("input")
    inputAge.id = "age"
    inputAge.placeholder = "age..."
    form.appendChild(inputAge)

    const inputDescription = document.createElement("input")
    inputDescription.id = "description"
    inputDescription.placeholder = "description...."
    form.appendChild(inputDescription)

    const button = document.createElement("button")
    button.innerText = "Create"
    button.id = "create"
    form.appendChild(button)
}

renderCreateMonster()

const createButton = document.querySelector("#create")
const valueName = document.querySelector("input#name")
const valueAge = document.querySelector("input#age")
const valueDescription = document.querySelector("input#description")
const findForm = document.querySelector("#monster-form")

createButton.addEventListener("click", (event) => {
    event.preventDefault()
    let monsterData = { 
        name: valueName.value, 
        age: valueAge.value,
        description: valueDescription.value
    }
    api.postMonsters(monsterData)
        .then(renderMonsters())
    
    findForm.reset()
})

populateMonsters()