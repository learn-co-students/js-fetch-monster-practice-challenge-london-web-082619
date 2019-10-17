
const END_POINT = "http://localhost:3000/monsters";
const PAGE_URL = pageNumber => "http://localhost:3000/monsters/?_limit=50&_page=" + pageNumber;


// const MONS_50 = `${END_POINT}/?_limit=50`  //if limit above 50, chnage renderMons



const getMons = function(pageNumber){
    return fetch(PAGE_URL(pageNumber))
    .then(resp => resp.json())
};

const postNewMon = function(newMon){
    return fetch(END_POINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newMon)
     }).then(resp => resp.json())// Need respsonse to render this newly created mon foo pessimistic method
}

const API = {getMons, postNewMon};

