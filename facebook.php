<?php
  error_reporting(-1);
  
  session_start();
  
  require_once('facebook/autoload.php');
  
  //~ require_once( 'facebook/src/Facebook/FacebookSession.php' );
  //~ require_once( 'facebook/src/Facebook/FacebookRedirectLoginHelper.php' );
  //~ require_once( 'facebook/src/Facebook/FacebookRequest.php' );
  //~ require_once( 'facebook/src/Facebook/FacebookResponse.php' );
  //~ require_once( 'facebook/src/Facebook/FacebookSDKException.php' );
  //~ require_once( 'facebook/src/Facebook/FacebookRequestException.php' );
  //~ require_once( 'facebook/src/Facebook/FacebookAuthorizationException.php' );
  //~ require_once( 'facebook/src/Facebook/GraphObject.php' );
  
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
  
  FacebookSession::setDefaultApplication('779323542128506', 'e31fe0edc86638e42b3457e0344d0096');

?>

<html>
  <head>
    <script src="js/facebook.js"></script>
  </head>

  <body>
  
    <div
      class="fb-like"
      data-share="true"
      data-width="450"
      data-show-faces="true">
    </div>
  
  </body>

</html>
