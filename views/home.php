<?php

$s = file_get_contents('home.html');

header("Content-Type: text/plain");
header("Content-Length:".strlen($s));
header("Wingest-size:".strlen($s));
flush();
ob_flush();
echo($s);
?>
