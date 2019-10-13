let pageNum = 1;
CONFIG = {
    BASE_URL: "http://localhost:3000",
    MONSTERS_URL: `http://localhost:3000/monsters/?_page=${pageNum}`
}
// get monsters data from the server
function getMonsters(){
    return fetch(`${CONFIG.BASE_URL}/monsters/?_page=${pageNum}`)
    // return fetch(`${CONFIG.BASE_URL}/monsters`)
    .then(response => response.json())
}

// send data to the server
function createFetchConfig(bodyData, httpMethod){
    return {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyData)
    };
}

// function postMonster(){
//     const nameInput = document.querySelector('#name'), 
//         ageInput = document.querySelector('#age'), 
//         descriptionInput = document.querySelector('#description');
//         const name= nameInput.value;
//         const age= ageInput.value;
//         const description= descriptionInput.value;
//     let monsterInfo ={ name, age, description};

//     createFetchConfig(monsterInfo,"POST");
//     return fetch(`${CONFIG.BASE_URL}/monsters`, createFetchConfig)
//     .then(resp => resp.json());
// }
const api = {getMonsters, renderMonsters, CONFIG, pageNum}