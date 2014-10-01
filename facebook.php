<?php
  //~ session_start();
//~ 
  //~ require_once('facebook/autoload.php');
  //~ 
  //~ use Facebook\FacebookSession;
  //~ use Facebook\FacebookRedirectLoginHelper;
  //~ use Facebook\FacebookRequest;
  //~ use Facebook\FacebookResponse;
  //~ use Facebook\FacebookSDKException;
  //~ use Facebook\FacebookRequestException;
  //~ use Facebook\FacebookAuthorizationException;
  //~ use Facebook\GraphObject;
  //~ use Facebook\Entities\AccessToken;
  //~ use Facebook\HttpClients\FacebookCurlHttpClient;
  //~ use Facebook\HttpClients\FacebookHttpable;
  //~ 
  //~ FacebookSession::setDefaultApplication('779323542128506', 'e31fe0edc86638e42b3457e0344d0096');
  //~ 
  //~ $helper = new FacebookRedirectLoginHelper('http://localhost/~senna/wingest/facebook_logged.php');
  //~ 
  //~ $loginUrl = $helper->getLoginUrl();

?>

<html>
  <body>
    <a href="<?php echo($loginUrl);?>">LogIn</a>
  </body>
</html>
