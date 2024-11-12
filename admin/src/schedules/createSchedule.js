function display(value) {
    const popup = document.getElementById('popup');
    let displayType = null;

    popup.style.display = value ? "block" : "none";
}

const main = document.getElementById('left-container');

const popup = document.createElement('div');
popup.style.display = "none";
popup.id = "popup";


const topBorder = document.createElement('div');
topBorder.innerHTML = `
<h1>Create Schedule</h1>
<button id="close-popup-button"><img src="" alt="Add CLOSE BUTTON IMG"></button>
`;

const form = document.createElement('form');
form.id = 'form';


// date input
const dateLabel = document.createElement('label');
const dateInput = document.createElement('input');

dateLabel.textContent = "Date";
dateLabel.setAttribute('for', 'date');

dateInput.setAttribute('type', 'date');
dateInput.setAttribute('id', 'date');
dateInput.setAttribute('name', 'date');
dateInput.setAttribute('required', '');


// location input
const locationLabel = document.createElement('label');
const locationInput = document.createElement('input');


// start time input
const startTimeLabel = document.createElement('label');
const startTimeInput = document.createElement('input');

// end time input
const endTimeLabel = document.createElement('label');
const endTimeInput = document.createElement('input');

// add button input
const addButton = document.createElement('button');
addButton.textContent = 'ADD';
addButton.setAttribute('type', 'submit');
addButton.setAttribute('name', 'add');
addButton.setAttribute('id', 'add-button');

form.appendChild(dateLabel);
form.appendChild(dateInput);
form.appendChild(addButton);


popup.appendChild(topBorder);
popup.appendChild(form);

main.appendChild(popup);

const createButton = document.getElementById('create-schedule-button');
createButton.onclick = () => display(true);

const closeButton = document.getElementById('close-popup-button');
closeButton.onclick = () => display(false);