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
  <!-- Main Login Card -->
  <form class="container" action="login-backend.php" method="POST">
    <!-- Header -->
    <div class="login_header">
      <img src="../../assets/images/slu-logo.jpg" alt="SLU LOGO" />
      <h1>SLU Vendor Org Login</h1>
      <p>Sign in to continue</p>
    </div>

    <!-- Input Fields -->
    <div class="login-container">
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username_textfield"
        placeholder="Username"
        required
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password_textfield"
        placeholder="••••••••••••"
        required
      />
      <span id="error-message">
        <?php 
          if (isset($_SESSION['login-error'])) {
            echo $_SESSION['login-error']; 
            unset($_SESSION['login-error']);
          }
        ?>
      </span>
    </div>

    <!-- Submit Button -->
    <button type="submit" name="login" id="submit_button">Log In</button>
  </form>
</body>

</html>

