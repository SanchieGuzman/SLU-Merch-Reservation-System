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
                </table>
            </div>
            

        </main>

        <div id="message-container">
            <!-- adds the message retrieved to the message container -->
            <?php 
                if (isset($_SESSION['create-schedule-successful'])) {
                    echo $_SESSION['create-schedule-successful']; 
                    unset($_SESSION['create-schedule-successful']);
                } else if (isset($_SESSION['create-schedule-failed'])) {
                    echo $_SESSION['create-schedule-failed']; 
                    unset($_SESSION['create-schedule-failed']);
                }
            ?>
        </div>

        <!-- adds the list of schedules to the table -->
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
                editButton.textContent = "edit";

                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "delete";

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

        <!-- external js file for the create schedule popup -->
        <script src="../schedules/createSchedule.js"></script>

        <!-- adds the function of displaying or hiding the message-container -->
        <script>
            window.onload = () => {
                const messageContainer = document.getElementById('message-container');
                if (messageContainer.textContent.trim() !== '') {
                    messageContainer.style.display = 'block';
                    setTimeout(() => {
                        messageContainer.style.display = 'none';
                    }, 5000);
                }
            }
        </script>
    </section>
</body>
</html>