const URL_PREFIX = `http://localhost:3000/monsters`
let page = 1;
let pageLimit = 0;
const recordsPerPage = 50;

window.addEventListener("DOMContentLoaded", () => {
  fetchMonsters();
  addEventListenersToButtons();
  renderMonsterForm();
})

function fetchMonsters() {
  return fetch(URL_PREFIX + `?_page=${page}&_limit=${recordsPerPage}`)
    .then(response => {
      setPageLimit(response.headers.get("x-total-count"));
      return response.json();
    })
    .then(json => renderMonsters(json))
    .catch(error => displayError(error));
}

function setPageLimit(totalRecords) {
  pageLimit = Math.ceil(totalRecords / recordsPerPage);
}

function renderMonsters(json) {
    const monsterContainer = document.querySelector("#monster-container");
    clearChildren(monsterContainer);
    json.forEach(monster => {
      let monsterDiv = createMonsterDiv(monster);
      monsterContainer.appendChild(monsterDiv);
    });
}

function clearChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function createMonsterDiv(monster) {
  let monsterDiv = document.createElement("div");
  monsterDiv.classList.add("monster");
  monsterDiv.innerHTML = `
  <h2>${monster.name}</h2>
  <p><em>Age: ${monster.age}</em></p>
  <p>${monster.description}</p>`;

  return monsterDiv;
}

function displayError(error) {
  alert(error.message);
}

function addEventListenersToButtons() {
  const backButton = document.querySelector("#back");
  const forwardButton = document.querySelector("#forward");

  backButton.addEventListener("click", loadLastPage);
  forwardButton.addEventListener("click", loadNextPage);
}

function loadLastPage() {
  if (page > 1) {
    page--;
    fetchMonsters();
  }
}

function loadNextPage() {
  if (page < pageLimit) {
    page++;
    fetchMonsters();
  }
}

function renderMonsterForm() {
  const monsterFormContainer = document.querySelector("#create-monster");
  monsterFormContainer.appendChild(createMonsterForm());
}

function createMonsterForm() {
  const form = createFormContainer();
  form.appendChild(createField("text", "name"));
  form.appendChild(createField("number", "age"));
  form.appendChild(createField("text", "description"));
  form.appendChild(createField("submit", "submit"));
  return form;
}

function createFormContainer() {
  const form = document.createElement("form")
  form.id = "monster-form";
  return form;
}

function createField(type, value) {
  const field = document.createElement("input");
  field.id = `monster-${value}`;
  field.type = type;
  if (type === "submit") {
    field.addEventListener("click", event => submitMonsterForm(event));
  }
  return field
}

function submitMonsterForm(event) {
  event.preventDefault();
  if (document.querySelector("#monster-name").value !== "" &&
      document.querySelector("#monster-age").value !== "" &&
      document.querySelector("#monster-description").value !== "") {
        const newMonster = getMonsterFromForm();
        const requestConfig = createRequestConfig(newMonster);
        clearMonsterForm();
        return fetch(URL_PREFIX, requestConfig)
          .catch(error => alert(error.message));
  }
}

function getMonsterFromForm() {
  return {
    name: document.querySelector("#monster-name").value,
    age: document.querySelector("#monster-age").value,
    description: document.querySelector("#monster-description").value
  }
}

function createRequestConfig(monster) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(monster)
  }
}

function clearMonsterForm() {
  ["name", "age", "description"].forEach(field => {
    document.querySelector(`#monster-${field}`).value = "";
  });
}