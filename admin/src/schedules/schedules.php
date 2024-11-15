<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Schedule</title>
    <link rel="stylesheet" href="../../assets/css/globals.css">
    <link rel="stylesheet" href="../../assets/css/schedule.css">
    <link rel="stylesheet" href="../../assets/css/schedule-popup.css">
</head>
<body>
    <?php 
        include('../schedules/schedules-backend.php');
        include('../sidenav/side-nav-backend.php');
        include('../sidenav/side-nav.php');
    ?>

    <section id="left-container">
        <?php
            include('../topbar/topbar.php')
        ?>

        <main id="schedules-container">
            <div id="top-border">
                <h1>View Schedules</h1>
                <button id="create-schedule-button">
                    <img class="add-button-icon" src="../../assets/images/add-logo.svg" alt="add logo">
                    <h2>Create Schedule</h2>
                </button>
            </div>
            <div id="schedule-list">
                <table id="schedule-table">
                    <tr>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th></th>
                    </tr>
                </table>
            </div>
            

        </main>

        <script>
            const container = document.getElementById('schedules-container');
            const table = document.getElementById('schedule-table');
            const scheduleList = <?php echo json_encode($scheduleList) ?>;

            scheduleList.forEach(schedule => {
                // add the row details and append to the table
                const tr = document.createElement("tr");

                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const td5 = document.createElement("td");

                td1.textContent = schedule.location;
                td2.textContent = schedule.date;
                td3.textContent = schedule.start_time;
                td4.textContent = schedule.end_time;

                const editButton = document.createElement("button");
                editButton.className = "edit-button";

                const deleteButton = document.createElement("button");
                editButton.className = "delete-button";

                editButton.addEventListener("click", () => {
                    console.log("Edit clicked for:", schedule.schedule_id);
                });

                deleteButton.addEventListener("click", () => {
                    console.log("Delete clicked for: ", schedule.schedule_id);
                });

                td5.appendChild(editButton);
                td5.appendChild(deleteButton);
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                table.appendChild(tr);
            });
        </script>

        <script src="../schedules/createSchedule.js"></script>
    </section>
</body>
</html>