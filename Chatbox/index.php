<?php

// session_start();
// $_SESSION['showMoreCount'] = 0;
// $_SESSION['displayNum'] = 10;
?>

<!-- HTML setup -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script defer src="./script.js"></script>
    <title>ChatBox</title>
</head>

<body>
    <h1>ChatBox</h1>
    <!-- form with 2 inputs (pseudo & message) and SEND button-->
    <!-- form action should be "postMsg.php" -->
    <!-- form method should be "POST" -->
    <form method="POST" action="postMsg.php" id="message-form">
        <!-- <input type="text" name="pseudo" id="pseudo" placeholder="Enter pseudo or anonymous..." value=<?php if (isset($_COOKIE['last_user'])) echo $_COOKIE['last_user']; ?>> -->
        <input type="text" name="pseudo" id="pseudo" placeholder="Enter pseudo or anonymous..." value=<?= isset($_COOKIE['last_user']) ? $_COOKIE['last_user']: ""; ?>>
        <input type="text" name="message" id="message" placeholder="Type your message...">
        <div id="buttons-container">
            <input type="submit" value="SEND" class="form-buttons">
            <div>
                <input type="reset" value="Refresh" class="form-buttons">
                <input type="button" id="show-more" value="Show More" class="form-buttons">
            </div>
        </div>
    </form>
    <form method="GET" id="filter-form">
        <input type="radio" id="10" name="message-limit" value="10" <?php if (!isset($_GET['message-limit']) || $_GET['message-limit'] == 10) echo "checked" ?>>
        <label for="10">10</label>
        <input type="radio" id="20" name="message-limit" value="20" <?php if (isset($_GET['message-limit']) && $_GET['message-limit'] == 20) echo "checked" ?>>
        <label for="20">20</label>
        <input type="radio" id="all" name="message-limit" value="all" <?php if (isset($_GET['message-limit']) && $_GET['message-limit'] == "all") echo "checked" ?>>
        <label for="all">All</label>
        <input type="submit" value="Filter Messages" id="filter">
    </form>
</body>

</html>

<!-- DB connection & query (1) to get message data -->
<?php

try {
    $db = new PDO('mysql:host=localhost;dbname=wcoding;charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Error : ' . $e->getMessage());
}

if (!isset($_GET["message-limit"]) || $_GET["message-limit"] == 10) {
    $response = $db->query('SELECT * FROM chatbox ORDER BY id DESC LIMIT 10');
} else if (isset($_GET["message-limit"]) && $_GET["message-limit"] == 20) {
    $response = $db->query('SELECT * FROM chatbox ORDER BY id DESC LIMIT 20');
} else if (isset($_GET["message-limit"]) && $_GET["message-limit"] == "all") {
    $response = $db->query('SELECT * FROM chatbox ORDER BY id DESC');
}
// $response = $db->query('SELECT * FROM chatbox ORDER BY id DESC');


$all_messages = $response->fetchAll(PDO::FETCH_ASSOC);
// $all_messages = $response->fetch(PDO::FETCH_ASSOC); // has a lower memory footprint; more memory efficient
?>

<!-- include messageView.php -->
<?php
include "messageView.php"
?>