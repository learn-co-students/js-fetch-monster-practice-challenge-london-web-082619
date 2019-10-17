const monList = document.querySelector("#monster-container");
const monForm = document.querySelector("#monster-form")


API.getMons50()
.then(mons50 => renderMons(mons50));

// //itration
const renderMons = function(mons50){
    console.log(mons50);
    for(const mon of mons50){
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
    postNewMon(newMon)
})