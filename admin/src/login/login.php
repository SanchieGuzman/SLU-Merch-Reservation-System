<?php
    session_start(); 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>
    <form action="login-backend.php" method='POST'>
        <label for="username">Username</label>
        <input type="text" name="username" id="username_textfield" required>
        <label for="password">Password</label>
        <input type="password" name="password" id="password_textfield" required>
        
        <!-- simple lang for invalid credentials -->
        <span id="error-message" style="color: red;"><?php 
             if (isset($_SESSION['login-error'])) {
                echo $_SESSION['login-error']; 
                unset($_SESSION['login-error']);
            }
        ?></span>

        <button type='submit' name='login' id="submit_button">Login</button>
    </form>
</body>

</html>
