<div class="movie-card">
    <a href="watch.php?path=<?= urlencode($movie->filename)?>&title=<?= urlencode($movie->title)?>">
        <video width="426" height="240" poster="./posters/<?= $movie->poster; ?>" onmouseover="this.play()" onmouseout="this.load()" onended="this.load()">
            <source src="./videos/<?= $movie->filename; ?>" type="video/mp4">
        </video>
        <div class="movie-text">
            <span class="movie-title"><?= $movie->title; ?></span>
            <div class="movie-details"><span><?= $movie->genre; ?></span><span><?= $movie->duration; ?></span></div>
        </div>
    </a>
</div>