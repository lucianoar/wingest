<?php 
  $response = '<section id="section_resultados">
  <h3>Resultados</h3>
</section>';

header("Content-Type: text/plain");
header("Content-Length:".(strlen($response)));
flush();
ob_flush();
sleep(20);
echo($response);
