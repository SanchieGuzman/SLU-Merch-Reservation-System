function display(value) {
    const popup = document.getElementById('popup');
    popup.style.display = value ? "block" : "none";
}

// main container
const mainContainer = document.getElementById('left-container');

// popup
const popup = document.createElement('div');
popup.setAttribute('id', 'popup');
popup.style.display = "none";

// header and subcontainers
const header = document.createElement('div');
const leftFormContainer = document.createElement('div');
const rightFormContainer = document.createElement('div');

header.setAttribute('id', 'header');
leftFormContainer.setAttribute('id', 'left-form-container');
rightFormContainer.setAttribute('id', 'right-form-container');

// heading
const h1 = document.createElement('h1');
h1.textContent = 'Create Schedule';

// buttons
const closeButton = document.createElement('button');
closeButton.setAttribute('id', 'close-popup-button');
closeButton.onclick = () => display(false);

const createButton = document.getElementById('create-schedule-button');
createButton.onclick = () => display(true);

// close button img
const closeButtonImg = document.createElement('img');
closeButtonImg.setAttribute('src', '');
closeButtonImg.setAttribute('alt', 'Add CLOSE BUTTON IMG');

// form
const form = document.createElement('form');
form.setAttribute('id', 'form');

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

locationLabel.textContent = 'Location'
locationLabel.setAttribute('for', 'location');

locationInput.setAttribute('type', 'text');
locationInput.setAttribute('id', 'location');
locationInput.setAttribute('name', 'location');
locationInput.setAttribute('required', '');

// start time input
const startTimeLabel = document.createElement('label');
const startTimeInput = document.createElement('input');

startTimeLabel.textContent = 'From'
startTimeLabel.setAttribute('for', 'start-time');

startTimeInput.setAttribute('type', 'time');
startTimeInput.setAttribute('id', 'start-time');
startTimeInput.setAttribute('name', 'from');
startTimeInput.setAttribute('required', '');

// end time input
const endTimeLabel = document.createElement('label');
const endTimeInput = document.createElement('input');

endTimeLabel.textContent = 'To'
endTimeLabel.setAttribute('for', 'end-time');

endTimeInput.setAttribute('type', 'time');
endTimeInput.setAttribute('id', 'end-time');
endTimeInput.setAttribute('name', 'to');
endTimeInput.setAttribute('required', '');

// add button input
const addButton = document.createElement('button');

addButton.textContent = 'ADD';
addButton.setAttribute('type', 'submit');
addButton.setAttribute('name', 'add');
addButton.setAttribute('id', 'add-button');


// append elements to its respective parent elements

// header
closeButton.appendChild(closeButtonImg);

header.appendChild(h1);
header.appendChild(closeButton);

// left sub container
leftFormContainer.appendChild(dateLabel);
leftFormContainer.appendChild(dateInput);

rightFormContainer.appendChild(locationLabel);
rightFormContainer.appendChild(locationInput);
rightFormContainer.appendChild(startTimeLabel);
rightFormContainer.appendChild(startTimeInput);
rightFormContainer.appendChild(endTimeLabel);
rightFormContainer.appendChild(endTimeInput);
rightFormContainer.appendChild(addButton);

// form
form.appendChild(leftFormContainer);
form.appendChild(rightFormContainer);

// popup
popup.appendChild(header);
popup.appendChild(form);

// main content
mainContainer.appendChild(popup);