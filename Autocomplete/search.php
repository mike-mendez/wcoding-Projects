<?php

$cities = unserialize(file_get_contents('capitalCities.txt'));
sort($cities);
$results = array();

foreach($cities as $city) {
    if (stripos($city, $_GET['s']) === 0) {
        array_push($results, "{$city}");
    }
}

foreach($results as $result) {
    echo "<div>$result</div>";
}