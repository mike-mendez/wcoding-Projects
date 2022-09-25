<?php

include "dbConnect.php";

$a_id = isset($_GET['articleid']) ? (int)$_GET['articleid'] : null;
$offset = isset($_GET['offset']) ? ((int)$_GET['offset'] - 1) * 5 : 1;

$req = $db->prepare('SELECT * FROM comments WHERE article_id = :inArticleID ORDER BY id DESC LIMIT :inOffset, 5');
$req->bindParam('inArticleID', $a_id, PDO::PARAM_INT);
$req->bindParam('inOffset', $offset, PDO::PARAM_INT);
$req->execute();
$res = $req->fetchAll(PDO::FETCH_ASSOC);

foreach ($res as $row) {
?>
    <div class="comment-bubble">
        <p><span class="comment-user"><?= $row["username"] ?></span> <?= " - " . $row["date_created"] ?></p>
        <p><?= $row["comment"] ?></p>
    </div>
<?php
}

$req = $db->prepare('SELECT COUNT(*) AS total FROM comments WHERE article_id = ?');
$req->execute(array($a_id));
$total = $req->fetch(PDO::FETCH_ASSOC);

for ($i = 1; $i <= ceil($total['total'] / 5); $i++) {
?>
    <button class="page-number" onclick="page(<?= $i ?>)"><?= $i ?></button>
<?php
}
?>