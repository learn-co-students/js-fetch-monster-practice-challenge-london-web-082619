let page = 1

BASE_URL = 'http://localhost:3000/monsters/',
LIMIT_URL = '?_limit=50&_page='

const getMonsters = () => {
    return fetch(`${BASE_URL}${LIMIT_URL}${page}`).then(response => response.json())
}

const configurationObject = (monsterData) => {
    return {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(monsterData)
    }
}

const postMonsters = (monsterData) => {
    return fetch(`${BASE_URL}`, configurationObject(monsterData))
        .then(response => response.json)
}

api = { getMonsters, postMonsters }