<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <script defer src="./script.js"></script>
    <title>Blog - Comments</title>
</head>

<body>
    <main id="comments-page">
        <a href="index.php" id="back-button">Back to Home</a>
        <?php
        include "articleCreation.php";
        ?>
        <div id="comments-container">
            <h1>Comments</h1>
            <form method="POST" action="addComment.php">
                <input type="text" name="username" placeholder="Enter a name or don't..." />
                <input type="text" name="comment" placeholder="Join the discussion..." />
                <input type="hidden" name="article_id" value=<?= $_GET['articleid'] ?> />
                <input type="submit" value="Send" />
            </form>
            <div><?php include "commentCreation.php"; ?></div>
        </div>
    </main>
</body>

</html>