const END_POINT = "http://localhost:3000/monsters"
const MONS_50 = `${END_POINT}/?_limit=50`  //if limit above 50, chnage renderMons



const getMons50 = function(){
    return fetch(MONS_50)
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

const API = {getMons50, postNewMon};

