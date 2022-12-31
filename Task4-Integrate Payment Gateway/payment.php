<?php

    $Name=$_POST['Name'];
    $Email=$_POST['Email'];
    $Amount=$_POST['Amount'];
    $Phone=$_POST['phone'];
    $purpose='Donation';

    $protocol = ((!empty(empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443)) ? "http://" : "https://";  
    //echo $protocol;
    $CurPageURL = $protocol . $_SERVER['HTTP_HOST'];
    //echo "The current page name is: ".$CurPageURL;  
    $re = "/redirect.php";
    $reurl = $CurPageURL.$re;
    include 'instamojo/Instamojo.php';
    $api = new Instamojo\Instamojo('test_c37be77f39eda37250529ef5548', 'test_a59d83ba9c7bf774fb12f71e836', 'https://test.instamojo.com/api/1.1/');

    try {
        $response = $api->paymentRequestCreate(array(
            "purpose" => $purpose,
            "amount" => $Amount,
            "send_email" => true,
            "email" => $Email,
            "buyer_name" =>$Name,
            "phone"=>$Phone,
            "send_sms" => true,
            "allow_repeated_payments" =>false,
            "redirect_url" => $reurl
            )
        );
        //print_r($response);
        $pay_url=$response['longurl'];
        header("location: $pay_url");
    	}
    	catch (Exception $e) {
    	    print('Error: ' . $e->getMessage());
    	}
?>


