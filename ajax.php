<?php
$size = 4096;
$times = 5;

header("Content-Type: text/plain");
header("Content-Length:".($size*$times));
flush();
ob_flush(); 



function send($size) {
  while($size-- > 0) {
    echo "A";
  }
  echo "\n";
}

for ($i = 0; $i < $times; $i++) {
  send($size);
  flush();
  ob_flush(); 
  sleep(5);
}
