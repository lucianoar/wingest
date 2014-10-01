<?php
  session_start();

  require_once('facebook/autoload.php');
  
  use Facebook\FacebookSession;
  use Facebook\FacebookRedirectLoginHelper;
  use Facebook\FacebookRequest;
  use Facebook\FacebookResponse;
  use Facebook\FacebookSDKException;
  use Facebook\FacebookRequestException;
  use Facebook\FacebookAuthorizationException;
  use Facebook\GraphObject;
  use Facebook\Entities\AccessToken;
  use Facebook\HttpClients\FacebookCurlHttpClient;
  use Facebook\HttpClients\FacebookHttpable;
  
  use Facebook\GraphUser;
  
  FacebookSession::setDefaultApplication('779323542128506', 'e31fe0edc86638e42b3457e0344d0096');
  
  $helper = new FacebookRedirectLoginHelper('http://localhost/~senna/wingest/facebook_logged.php');
  
  $session = $helper->getSessionFromRedirect();

  print_r($session);
  
  $user_profile = (new FacebookRequest(
      $session, 'GET', '/me'
    ))->execute()->getGraphObject(GraphUser::className());
  
  print_r($user_profile);

  if($session) {

    try {

      $response = (new FacebookRequest(
        $session, 'POST', '/me/feed', array(
          'link' => 'www.torneowingest.com.ar',
          'message' => 'Bla bla bla bla'
        )
      ))->execute()->getGraphObject();

      echo "Posted with id: " . $response->getProperty('id');

    } catch(FacebookRequestException $e) {

      echo "Exception occured, code: " . $e->getCode();
      echo " with message: " . $e->getMessage();

    }   

  }


?>

<?php 

  if($user_profile){
    echo '<h3>Hola '.$user_profile->getName().'! Puto.</h3>';
    }

?>
