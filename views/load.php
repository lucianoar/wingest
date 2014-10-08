<?php
  
  $header['home'] = array(
    'content' => 'views/home.php',
    'attachs' => array("img/fondo1.png","img/fondo2.png","img/fondo3.png"),
    'relations' => array(array("img/fondo1.png" => 'manofthematch'))
  );
  
  $s = json_encode($header[$_GET['section']]);
  
  header('Wingest-Section:'.$s);
  
  echo '';
?>
