<?php
/**
* Author: Luis Zuno
* Email: luis@luiszuno.com
* URL: http://www.luiszuno.com
* Version: 1.0.0 
**/

//vars
$subject = $_POST['subject'];
$to = explode(',', $_POST['to'] );

$from = $_POST['email'];

//data
$msg = "NAME: "  .$_POST['name']    ."<br>\n";
$msg .= "EMAIL: "  .$_POST['email']    ."<br>\n";
$msg .= "WEBSITE: "  .$_POST['web']    ."<br>\n";
$msg .= "COMMENTS: "  .$_POST['comments']    ."<br>\n";

//Headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: <".$from. ">" ;

//$headers = "From: <".$from. ">" ;
/*
$to = "dilver.gutierrez@innovarit.com.pe";
   $subject = "This is subject";
   $message = "This is simple text message.";
   $header = "From:dilver.gutierrez@innovarit.com.pe \r\n";
   //$retval = mail ($to,$subject,$message,$header);
   if( $retval == true )  
   {
      echo "Message sent successfully...";
   }
   else
   {
      echo "Message could not be sent...";
   }
   */
//send for each mail

foreach($to as $mail){
if (mail($mail, $subject, $msg, $headers)) {
   echo("<p>Mensaje enviado!</p>");
   
  } else {
   echo("<p>Error al enviar...</p>");
  }
}

//$url='http://www.innovarit.com.pe/';
/*
function full_url()
{
    $s = empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on") ? "s" : "";
    $sp = strtolower($_SERVER["SERVER_PROTOCOL"]);
    $protocol = substr($sp, 0, strpos($sp, "/")) . $s;
    $port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":".$_SERVER["SERVER_PORT"]);
    return $protocol . "://" . $_SERVER['SERVER_NAME'] . $port . $_SERVER['REQUEST_URI'];
}
$actual_link = full_url();
*/
$url=$_SERVER['HTTP_REFERER'];
die('<script type="text/javascript">window.location=\'' . $url . '\';</script>');

?>
