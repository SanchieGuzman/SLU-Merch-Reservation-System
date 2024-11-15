function display(value) {
    const popup = document.getElementById('popup');
    popup.style.display = value ? "block" : "none";
}

function validateDate() {
    const scheduledDate = new Date(document.getElementById('date').value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (scheduledDate < currentDate) {
        alert('The chosen date has already elapsed, please choose another date');
        return false;
    }

    if (scheduledDate.toDateString() === currentDate.toDateString()) {
        console.log('if condition accepted');

        const startTime = document.getElementById('start-time').value;
        const [startingHour, startingMinute] = startTime.split(':').map(Number);

        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();

        if (startingHour < currentHour || (startingHour === currentHour && startingMinute < currentMinute)) {
            alert('The current time is already past the start time, please choose a later time');
            return false;
        }
    }

    return true;
}

function validateTime() {
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (endTime < startTime) {
        alert('End time cannot be earlier than the start time.');
        return false;
    }

    return true;
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
const timeRangeContainer= document.createElement('div'); // ====== Created new subcontainer =====
const timeRangeContainerLeft = document.createElement('div'); // ====== Created new subcontainer =====
const timeRangeContainerRight = document.createElement('div'); // ====== Created new subcontainer =====

header.setAttribute('id', 'header');
leftFormContainer.setAttribute('id', 'left-form-container');
rightFormContainer.setAttribute('id', 'right-form-container');
timeRangeContainer.setAttribute('id', 'time-range-container');// ====== Created new subcontainer =====
timeRangeContainerLeft.setAttribute('id', 'time-range-container-left');// ====== Created new subcontainer =====
timeRangeContainerRight.setAttribute('id', 'time-range-container-right');// ====== Created new subcontainer =====

// heading
const h1 = document.createElement('h1');
h1.textContent = 'Create Schedule';

// buttons
const closeButton = document.createElement('button');
closeButton.setAttribute('id', 'close-popup-button');
closeButton.onclick = () => {
    display(false);
    form.reset();
};

const createButton = document.getElementById('create-schedule-button');
createButton.onclick = () => display(true);

// close button img
const closeButtonImg = document.createElement('img');
closeButtonImg.setAttribute('src', '../../assets/images/close-logo.svg');
closeButtonImg.setAttribute('alt', 'Add CLOSE BUTTON IMG');


// form
const form = document.createElement('form');
form.setAttribute('id', 'form');
form.setAttribute('action', '../schedules/add-schedule.php');
form.setAttribute('method', 'POST');
form.setAttribute("enctype", "multipart/form-data");

// date input
const dateLabel = document.createElement('label');
const dateInput = document.createElement('input');

dateLabel.textContent = "Date";
dateLabel.setAttribute('for', 'date');

dateInput.setAttribute('id', 'date');
dateInput.setAttribute('type', 'date');
dateInput.setAttribute('name', 'date');
dateInput.setAttribute('required', '');

// location input
const locationLabel = document.createElement('label');
const locationInput = document.createElement('select');

locationLabel.textContent = 'Location'
locationLabel.setAttribute('for', 'locations');

locationInput.setAttribute('id', 'locations');
locationInput.setAttribute('name', 'location');
locationInput.setAttribute('required', '');

const defaultOption = document.createElement('option');
defaultOption.textContent = 'Choose One';
defaultOption.setAttribute('value', '');
defaultOption.setAttribute('disabled', '');
defaultOption.setAttribute('selected', '');

const option1 = document.createElement('option');
option1.textContent = 'Main Campus Lobby';
option1.setAttribute('value', 'Main Campus Lobby');

const option2 = document.createElement('option');
option2.textContent = 'Maryheights Campus Lobby';
option2.setAttribute('value', 'Maryheights Campus Lobby');

locationInput.appendChild(defaultOption);
locationInput.appendChild(option1);
locationInput.appendChild(option2);

locationInput.selectedIndex = 0;

// start time input
const startTimeLabel = document.createElement('label');
const startTimeInput = document.createElement('input');

startTimeLabel.textContent = 'From'
startTimeLabel.setAttribute('for', 'start-time');

startTimeInput.setAttribute('id', 'start-time');
startTimeInput.setAttribute('type', 'time');
startTimeInput.setAttribute('name', 'start_time');
startTimeInput.setAttribute('required', '');

// end time input
const endTimeLabel = document.createElement('label');
const endTimeInput = document.createElement('input');

endTimeLabel.textContent = 'To'
endTimeLabel.setAttribute('for', 'end-time');

endTimeInput.setAttribute('id', 'end-time');
endTimeInput.setAttribute('type', 'time');
endTimeInput.setAttribute('name', 'end_time');
endTimeInput.setAttribute('required', '');

// add button input
const addButton = document.createElement('button');

addButton.textContent = 'ADD';
addButton.setAttribute('id', 'add-button');
addButton.setAttribute('type', 'submit');
addButton.setAttribute('name', 'add');

addButton.addEventListener('click', (event) => {
    // start the validation check if all fields are populated
    const date = document.getElementById('date').value;
    const location = document.getElementById('locations').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (date && location && startTime && endTime) {
        // validates the specified starting and ending time
        if (!validateDate()) {
            event.preventDefault();
            return;
        }
        
        if (!validateTime()) {
            event.preventDefault();
            return;
        }
    }
});

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
timeRangeContainerLeft.appendChild(startTimeLabel);
timeRangeContainerLeft.appendChild(startTimeInput);
timeRangeContainerRight.appendChild(endTimeLabel);
timeRangeContainerRight.appendChild(endTimeInput);
timeRangeContainer.appendChild(timeRangeContainerLeft);
timeRangeContainer.appendChild(timeRangeContainerRight);  
rightFormContainer.appendChild(timeRangeContainer);

rightFormContainer.appendChild(addButton);

// form
form.appendChild(leftFormContainer);
form.appendChild(rightFormContainer);

// popup
popup.appendChild(header);
popup.appendChild(form);

// main content
mainContainer.appendChild(popup);