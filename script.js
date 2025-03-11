const COHORT = "2502-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    parties: []
};

const partiesList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");



async function render() {
    await getParties();
    renderParties();
}
render();

async function getParties() {
    try {
        const response = await fetch (API_URL);
        const json = await response.json();
        console.log(json)
        state.parties = json.data
    } catch(error) {
        console.error(error)
    }
}


async function addParty (event) {
    event.preventDefault();

    await createParty (
        addPartyForm.title.value,
        addPartyForm.description.value,
        addPartyForm.date.value,
        addPartyForm.location.value
    );
}

addPartyForm.addEventListener("submit", addParty);

async function createParty(name, description, date, location) {
    try {
        const response = await fetch (API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, description, date, location})
        });
        
        render()
        const json = await response.json()
        
    } catch (error) {
        console.error(error)
    }
}


async function deleteParty(id) {

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        render()
    } catch (error) {
        console.error(error);
    }
}



function renderParties() {
    if (!state.parties.length) {
        partiesList.innerHTML = 
        "No parties found.";
        return;
    }


console.log(state.parties)
    const partyCards = state.parties.map((party) => {
        const partyCard = document.createElement("li");
        partyCard.innerText = `
            ${party.name}
            ${party.description}
            ${party.date}
            ${party.location}
            `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Party";
        partyCard.append(deleteButton);

        deleteButton.addEventListener("click", () => deleteParty
    (party.id));
    partiesList.append(partyCard)
    return partyCard;
            
    }); console.log(partyCards)
    

 }
