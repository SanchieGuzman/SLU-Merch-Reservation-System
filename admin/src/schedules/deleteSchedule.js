function displayDeleteSchedulePopup(value) {
    const popup = document.getElementById('delete-schedule-popup');
    popup.style.display = value ? 'block' : 'none';
}

function showDeleteSchedulePopup(schedule_id) {
    const scheduleID = document.getElementById('schedule-id-delete');

    scheduleID.value = schedule_id;

    displayDeleteSchedulePopup(true);
}

function initDeleteSchedulePopup() {
    // main container
    const mainContainer = document.getElementById('left-container');

    // popup
    const popup = document.createElement('div');
    popup.setAttribute('id', 'delete-schedule-popup');
    popup.style.display = 'none';

    // header and subcontainers
    const header = document.createElement('div');
    const actionContainer = document.createElement('div');

    header.setAttribute('id', 'delete-schedule-header');
    actionContainer.setAttribute('id', 'delete-schedule-action-container');

    // heading
    const h1 = document.createElement('h1');
    h1.textContent = 'Delete Schedule';

    // cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel'
    cancelButton.setAttribute('id', 'cancel-delete-button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.onclick = () => {
        displayDeleteSchedulePopup(false);
    };

    // form
    const form = document.createElement('form');
    form.setAttribute('id', 'delete-schedule-form');
    form.setAttribute('action', '../schedules/delete-schedule.php');
    form.setAttribute('method', 'POST');
    
    // hidden schedule ID
    const scheduleID = document.createElement('input');
    scheduleID.setAttribute('id', 'schedule-id-delete');
    scheduleID.setAttribute('type', 'hidden');
    scheduleID.setAttribute('name', 'schedule_id');

    // message
    const message = document.createElement('span');
    message.textContent = 'Are you sure you want to remove this schedule?';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Delete';
    confirmButton.setAttribute('id', 'confirm-delete-button');
    confirmButton.setAttribute('type', 'submit');
    confirmButton.setAttribute('name', 'confirm');

    // append elements to its respective parent elements

    // header
    header.appendChild(h1);

    // action container
    actionContainer.appendChild(cancelButton);
    actionContainer.appendChild(confirmButton);

    // form
    form.appendChild(scheduleID);
    form.appendChild(message);
    form.appendChild(actionContainer);

    // popup
    popup.appendChild(header);
    popup.appendChild(form);

    // main content
    mainContainer.appendChild(popup);
}

initDeleteSchedulePopup();