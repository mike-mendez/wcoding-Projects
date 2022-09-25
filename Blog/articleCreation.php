<?php

include "dbConnect.php";

if (isset($_GET['articleid'])) {
    $t = isset($_GET['articleid']) ? (int)$_GET['articleid'] : null;
    $req = $db->prepare('SELECT * FROM articles WHERE id = :inArticleID');
    $req->bindParam('inArticleID', $t, PDO::PARAM_INT);
    $req->execute();
} else {
    $req = $db->query('SELECT * FROM articles');
}

$res = $req->fetchAll(PDO::FETCH_ASSOC);

foreach ($res as $row) {
?>
    <div class="article-card">
        <div class="article-main">
            <div class="article-img-container"><img src="https://source.unsplash.com/600x400/?<?= $row["topic"] ?>" class="article-img" /></div>
            <div class="article-details">
                <span class="article-topic"><?= $row["topic"] ?></span>
                <h2><?= $row["title"] ?></h2>
                <p class="article-content"><?= $row["content"] ?></p>
            </div>
        </div>
        <div class="article-footer">
            <div class="author-details-container">
                <div class="author-img-container"><img src="https://i.pravatar.cc/40?img=<?= rand(0, 70) ?>" class="author-img" /></div>
                <p class="author-name"><?= $row["author"] ?></p>
                <p class="date-posted"><?= $row["date_created"] ?></p>
            </div>
            <?php
            if (!isset($_GET['articleid'])) {
            ?>
                <a href="./commentsPage.php?articleid=<?= $row["id"] ?>" class="comment-anchor">COMMENTS</a>
            <?php
            }
            ?>
        </div>
    </div>
<?php
}
?>