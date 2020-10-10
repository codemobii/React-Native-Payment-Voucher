<?php

include 'config.php';

$message = '';

$connection = new mysqli($host_name, $host_user, $host_password, $database_name);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$query = "INSERT INTO items (serial_number,payment_method,reference_no,item_description,amount) values('$json[serial_number]','$json[payment_method]','$json[reference_no]','$json[item_description]','$json[amount]')";

$query_result = $connection->query($query);

if ($query_result === true) {
    $message = 'Item added successfully!';
} else {
    $message = 'An error occurred! Try Again.(' . $connection->error . ')';
}

echo json_encode($message);

$connection->close();
