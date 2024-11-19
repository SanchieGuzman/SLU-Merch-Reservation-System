function displayEditSchedulePopup(value) {
    const popup = document.getElementById('edit-schedule-popup');
    popup.style.display = value ? 'block' : 'none';
}

function validateNewDate() {
    const scheduledDate = new Date(document.getElementById('edit-date').value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (scheduledDate < currentDate) {
        alert('The chosen date has already elapsed, please choose another date');
        return false;
    }

    if (scheduledDate.toDateString() === currentDate.toDateString()) {
        console.log('if condition accepted');

        const startTime = document.getElementById('edit-start-time').value;
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

function validateNewTime() {
    const startTime = document.getElementById('edit-start-time').value;
    const endTime = document.getElementById('edit-end-time').value;

    if (endTime < startTime) {
        alert('End time cannot be earlier than the start time.');
        return false;
    }

    return true;
}

function showEditSchedulePopup(schedule) {
    const scheduleID = document.getElementById('schedule-id-edit');
    const dateInput = document.getElementById('edit-date');
    const locationInput = document.getElementById('edit-location');
    const startTimeInput = document.getElementById('edit-start-time');
    const endTimeInput = document.getElementById('edit-end-time');

    scheduleID.value = schedule.schedule_id;
    dateInput.value = new Date(schedule.date).toISOString().split('T')[0];
    locationInput.value = schedule.location;
    startTimeInput.value = schedule.start_time;
    endTimeInput.value = schedule.end_time;

    displayEditSchedulePopup(true);
}

function initEditPopup() {
    // main container
    const mainContainer = document.getElementById('left-container');

    // popup
    const popup = document.createElement('div');
    popup.setAttribute('id', 'edit-schedule-popup');
    popup.style.display = 'none';

    // header and subcontainers
    const header = document.createElement('div');
    const inputContainer = document.createElement('div');
    const actionContainer = document.createElement('div');

    header.setAttribute('id', 'edit-schedule-header');
    inputContainer.setAttribute('id', 'edit-sched-input-container');
    actionContainer.setAttribute('id', 'edit-sched-action-container');

    // heading
    const h1 = document.createElement('h1');
    h1.textContent = 'Edit Schedule';

    // cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.setAttribute('id', 'cancel-edit-button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.onclick = () => {
        displayEditSchedulePopup(false);
    };

    // form
    const form = document.createElement('form');
    form.setAttribute('id', 'edit-schedule-form');
    form.setAttribute('action', '../schedules/edit-schedule/edit-schedule.php');
    form.setAttribute('method', 'POST');
    form.setAttribute('enctype', 'multipart/form-data');
    
    // hidden schedule ID
    const scheduleID = document.createElement('input');
    scheduleID.setAttribute('id', 'schedule-id-edit');
    scheduleID.setAttribute('type', 'hidden');
    scheduleID.setAttribute('name', 'schedule_id');

    // date input
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');

    dateLabel.textContent = "Date";
    dateLabel.setAttribute('for', 'edit-date');

    dateInput.setAttribute('id', 'edit-date');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'new_date');
    dateInput.setAttribute('required', '');

    // location input
    const locationLabel = document.createElement('label');
    const locationInput = document.createElement('select');

    locationLabel.textContent = 'Location'
    locationLabel.setAttribute('for', 'edit-location');

    locationInput.setAttribute('id', 'edit-location');
    locationInput.setAttribute('name', 'new_location');
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

    // start time input
    const startTimeLabel = document.createElement('label');
    const startTimeInput = document.createElement('input');

    startTimeLabel.textContent = 'From'
    startTimeLabel.setAttribute('for', 'edit-start-time');

    startTimeInput.setAttribute('id', 'edit-start-time');
    startTimeInput.setAttribute('type', 'time');
    startTimeInput.setAttribute('name', 'new_start_time');
    startTimeInput.setAttribute('required', '');

    // end time input
    const endTimeLabel = document.createElement('label');
    const endTimeInput = document.createElement('input');

    endTimeLabel.textContent = 'To'
    endTimeLabel.setAttribute('for', 'edit-end-time');

    endTimeInput.setAttribute('id', 'edit-end-time');
    endTimeInput.setAttribute('type', 'time');
    endTimeInput.setAttribute('name', 'new_end_time');
    endTimeInput.setAttribute('required', '');

    // confirm button
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.setAttribute('id', 'confirm-edit-button');
    confirmButton.setAttribute('type', 'submit');
    confirmButton.setAttribute('name', 'confirm');

    confirmButton.addEventListener('click', (event) => {
        const date = document.getElementById('edit-date').style;
        const location = document.getElementById('edit-location').style;
        const startTime = document.getElementById('edit-start-time').style;
        const endTime = document.getElementById('edit-end-time').style;

        if (date && location && startTime && endTime) {
            // validates the specified starting and ending time
            if (!validateNewDate()) {
                event.preventDefault();
                return;
            }

            if (!validateNewTime()) {
                event.preventDefault();
                return;
            }
        }
    });

    // append elements to its respective parent elements

    // header
    header.appendChild(h1);

    // input container
    inputContainer.appendChild(dateLabel);
    inputContainer.appendChild(dateInput);
    inputContainer.appendChild(locationLabel);
    inputContainer.appendChild(locationInput);
    inputContainer.appendChild(startTimeLabel);
    inputContainer.appendChild(startTimeInput);
    inputContainer.appendChild(endTimeLabel);
    inputContainer.appendChild(endTimeInput);

    // action container
    actionContainer.appendChild(cancelButton);
    actionContainer.appendChild(confirmButton);

    // form
    form.appendChild(inputContainer);
    form.appendChild(actionContainer);
    form.appendChild(scheduleID);

    // popup
    popup.appendChild(header);
    popup.appendChild(form);

    // main content
    mainContainer.appendChild(popup);
}

initEditPopup();