<!-- HTML with PHP for the display of the messages -->
<!-- USING data fetched from index.php -->

<?php

echo "<div id='message-container'>";

foreach ($all_messages as $row) {
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

echo "</div>";

// can open/close php tags within conditional statements and display HTML instead of echoing everything

?>
