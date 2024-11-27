<?php
    session_start(); 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../../assets/css/globals.css">
    <link rel="stylesheet" href="../../assets/css/login.css">
</head>

<body>
    <div class="login_header">
        <img src="../../assets/images/slu-logo.jpg" alt="This is a photo"> <!-- Image (To be changed)-->
        <h1>Vendor Login</h1>
        <p>Sign in to Continue</p>
    </div>

    <form class="container" action="login-backend.php" method='POST'>
        <div class="login-container">
            <label for="username">Username</label>
            <input type="text" name="username" id="username_textfield" placeholder="Username" required>
            <label for="password">Password</label>
            <input type="password" name="password" id="password_textfield" placeholder="••••••••••••" required>
            
            <!-- simple lang for invalid credentials -->
            <span id="error-message" style="color: red;"><?php 
                if (isset($_SESSION['login-error'])) {
                    echo $_SESSION['login-error']; 
                    unset($_SESSION['login-error']);
                }
            ?></span>
        </div>
        
        <button type='submit' name='login' id="submit_button">Login</button>
    </form>
</body>

</html>

