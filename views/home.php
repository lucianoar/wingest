<?php

  $view[] = file_get_contents('./home.html', true);
  
  //~ print_r($view);
  
  $a = json_encode($view);
  
  echo($a);
?>
