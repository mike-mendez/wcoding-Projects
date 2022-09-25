<?php
  $method = $_SERVER['REQUEST_METHOD'];

  if ($_GET && $_GET['url']) {
    $headers = getallheaders();
    $headers_str = [];
    $url = $_GET['url'];

    foreach ( $headers as $key => $value){
      if($key == 'Host')
        continue;
      $headers_str[]=$key.":".$value;
    }

    $ch = curl_init($url);

    curl_setopt($ch,CURLOPT_URL, $url);
    if( $method !== 'GET') {
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    }

    if($method == "PUT" || $method == "PATCH" || ($method == "POST" && empty($_FILES))) {
      $data_str = file_get_contents('php://input');
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data_str);
    }
    elseif($method == "POST") {
      $data_str = array();
      if(!empty($_FILES)) {
        foreach ($_FILES as $key => $value) {
          $full_path = realpath( $_FILES[$key]['tmp_name']);
          $data_str[$key] = '@'.$full_path;
        }
      }

      curl_setopt($ch, CURLOPT_POSTFIELDS, $data_str+$_POST);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers_str );

    // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // Ignore SSL cert expirations (or missing)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  // Ignore SSL cert expirations (or missing)
    curl_setopt($ch, CURLOPT_ENCODING, '');  // So that gzip isn't used.

    $result = curl_exec($ch);

    if(curl_errno($ch)){
        echo 'Curl error: ' . curl_error($ch);
    }

    curl_close($ch);

    header('Content-Type: application/json');

    // file_put_contents('/Users/marie/proxy.log', $result);
    echo $result;
  }
  else {
    echo $method;
    var_dump($_POST);
    var_dump($_GET);
    $data_str = file_get_contents('php://input');
    echo $data_str;
  }