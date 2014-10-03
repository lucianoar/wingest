<?php
  
  $headers = array(
    'home' => '["views/home.php","img/fondo1.png","img/fondo2.png"]',
  );
  
  header('Wingest-Layout-dependencies:'.$headers[$_GET['section']]);
  
  echo '';
?>
