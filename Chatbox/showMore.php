<?php

// session_status() == 1 ? session_start() : null; // if there is no current session, start one
// session statuses: 0 = DISABLED, 1 = NONE, 2 = ACTIVE
session_start(); // have to include to use $_SESSION variables

try {
    $db = new PDO('mysql:host=localhost;dbname=wcoding;charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Error : ' . $e->getMessage());
}

// should only use prepare if using user input; use query instead
$req = $db->prepare('SELECT * FROM chatbox ORDER BY id DESC LIMIT :inOffset, :inAmount');

$req->bindParam('inOffset', $_GET['offset'], PDO::PARAM_INT);
$req->bindParam('inAmount', $_GET['amount'], PDO::PARAM_INT);
$req->execute();

$data = $req->fetchAll(PDO::FETCH_ASSOC);

foreach($data as $row) {
    if ($row['id'] % 2 !== 0) {
        echo "<div class = 'container-right'>";
        echo "<div class = 'message-right'>" . $row['message'] . "</div>";
        if ($row['pseudo'] === 'anonymous') {
            echo "<p class = 'user-details user-right'>" . $row['pseudo'] . $row['id'] . " " . $row['created_at'] . "</p>";
        } else {
            echo "<p class = 'user-details user-right'>" . $row['pseudo'] . " " . $row['created_at'] . "</p>";
        }
        echo "</div>";
    } else {
        echo "<div class = 'container-left'>";
        echo "<div class = 'message-left'>" . $row['message'] . "</div>";
        if ($row['pseudo'] === 'anonymous') {
            echo "<p class = 'user-details user-left'>" . $row['pseudo'] . $row['id'] . " " . $row['created_at'] . "</p>";
        } else {
            echo "<p class = 'user-details user-left'>" . $row['pseudo'] . " " . $row['created_at'] . "</p>";
        }
        echo "</div>";
    }
}
