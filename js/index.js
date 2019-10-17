const monList = document.querySelector("#monster-container");
const monForm = document.querySelector("#monster-form")
let pageNumber = 1;
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");

//get data
API.getMons(pageNumber)
.then(monsOnThePage => renderMons(monsOnThePage))


// //itration
const renderMons = function(monsOnThePage){
    console.log(monsOnThePage);
    while (monList.firstChild)
      monList.removeChild(monList.firstChild)
    for(const mon of monsOnThePage){
        renderMon(mon)
    };
    // //when took more than 50 mons from the database
    // const newMon50 = mons50.slice(0,50)
    // console.log(newMon50);
};

//list mons
const renderMon = function(mon){
    

    const div = document.createElement("div")
    div.id = `mon-${mon.id}`
    const h2 = document.createElement("h2")
    h2.innerText = mon.name
    const h3 = document.createElement("h3")
    h3.innerText = mon.age
    const p = document.createElement("p")
    p.innerText = mon.description
    div.append(h2,h3,p)
    monList.appendChild(div)
};

monForm.addEventListener("submit", function(e){
    const newMon = {
        name: e.target.elements.name.value,
        age: e.target.elements.age.value,
        description: e.target.elements.description.value
    };
    postNewMon(newMon);
    e.target.reset();
});

backButton.addEventListener('click', (e) => {
    let currentPageNumber = pageNumber
    currentPageNumber > 1 ? currentPageNumber-- : currentPageNumber
    API.getMons(pageNumber)
    .then(monsOnThePage => renderMons(monsOnThePage))
  })

forwardButton.addEventListener('click', (e) => {
    const upperLimit = 20 // 1000/50 
    let currentPageNumber = pageNumber
    currentPageNumber < upperLimit ? currentPageNumber++ : currentPageNumber
    API.getMons(currentPageNumber)
    .then(monsOnThePage => renderMons(monsOnThePage))
    
  })    