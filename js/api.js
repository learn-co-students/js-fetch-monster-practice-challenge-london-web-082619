
// CONSTANTS

const baseURL = "http://localhost:3000/monsters/"
const URL = "http://localhost:3000/monsters/?_limit=50&_page="
const getURL = "http://localhost:3000/monsters/?_limit="

headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

// FUNCTIONALITY

function get(pg, lim=50){
    return fetch(getURL+`${lim}`+'&_page='+`${pg}`).then(resp => resp.json())
}

function post(submitData){
    return fetch(baseURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(submitData)
    })
}

API = {
    get: get,
    post: post
}

