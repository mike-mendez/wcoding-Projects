<!-- Capture $_POST data send from form -->
<?php

$pseudo = strlen(htmlspecialchars($_POST['pseudo'])) < 1 ? null : htmlspecialchars($_POST['pseudo']);
$message = htmlspecialchars($_POST['message']);

setcookie('last_user', $pseudo);

?>

<!-- CONNECT and INSERT data into DB -->
<?php

// Should check if both pseduo and message are empty or not; run the below code if message is not empty

// Can use (int) before a variable to cast(change) it to an int; works for other variables as well

try {
    $db = new PDO('mysql:host=localhost;dbname=wcoding;charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Error : ' . $e->getMessage());
}

if ($pseudo === null) {
    $req = $db->prepare('INSERT INTO chatbox (message) VALUES(:inMessage)');
    $req->execute(array(
        'inMessage' => $message
    ));
} else {
    // should use ? if there isn't many variables (i.e 2); use nominal markers if there are many, so order doesn't matter when executing
    $req = $db->prepare('INSERT INTO chatbox (pseudo, message) VALUES(:inPseudo, :inMessage)');
    $req->execute(array(
        'inPseudo' => $pseudo,
        'inMessage' => $message
    ));
}

?>

<!-- Redirect back to index.php page -->
<?php
header('Location: index.php');
?>