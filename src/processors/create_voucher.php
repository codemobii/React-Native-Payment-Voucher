<?php

include 'config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$query = "INSERT INTO vouchers (voucher_no,ledger,account,pay_to,email_address,phone_number,authorized_by,recieved_by) values('$json[voucher_no]','$json[ledger]','$json[account]','$json[pay_to]','$json[email_address]','$json[phone_number]','$json[authorized_by]','$json[recieved_by]')";

$query_result = $connection->query($query);

if ($query_result === true) {
    $message = 'Voucher created successfully!';
} else {
    $message = 'An error occurred! Try Again.(' . $connection->error . ')';
}

echo json_encode($message);

$connection->close();
