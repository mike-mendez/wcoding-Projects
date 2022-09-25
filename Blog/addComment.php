<?php

include "dbConnect.php";

$username = strlen(htmlspecialchars($_POST['username'])) < 1 ? null : htmlspecialchars($_POST['username']);
$comment = htmlspecialchars($_POST['comment']) < 1 ? null : htmlspecialchars($_POST['comment']);
$articleid = htmlspecialchars($_POST['article_id']);

if ($username === null && !empty($comment)) {
    $req = $db->prepare('INSERT INTO comments (article_id, comment) VALUES(:inArticleID, :inComment)');
    $req->execute(array(
        'inArticleID' => $articleid,
        'inComment' => $comment
    ));
} else if (!empty($comment)) {
    $req = $db->prepare('INSERT INTO comments (article_id, username, comment) VALUES(:inArticleID, :inUser, :inComment)');
    $req->execute(array(
        'inArticleID' => $articleid,
        'inUser' => $username,
        'inComment' => $comment
    ));
}

header("Location: commentsPage.php?articleid={$articleid}#comments-container");