<?php
    session_start();

    require('../database/database.php');
    require('../classes/Organization.php');

    $db = Database::getInstance();

    $organization = $db->getOrganizationData($_SESSION['USER_ID']);

    //fetching user data for the nav bar and top bar
    $orgImage = $organization->getLogo();

    // Determine the MIME type of the image
    $finfo = finfo_open(FILEINFO_MIME_TYPE); // Open a file info resource
    $mimeType = finfo_buffer($finfo, $orgImage); // Get the MIME type from the BLOB
    finfo_close($finfo); // Close the resource

    $imageSource = '';
    // Display the image
    if ($orgImage) {
        // Convert the image blob to base64
        $base64 = base64_encode($orgImage);

        // Output the image as an HTML img tag
        $imageSource = "data:" . htmlspecialchars($mimeType) . ";base64," . $base64;
    }
    $orgName = $organization->getOrganizationName();
?>