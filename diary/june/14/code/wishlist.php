<?php
header( 'Content-Type: application/json;charset=utf-8;' );

$arr = array(
	'status'  => 'success',
	'message' => 'Товар ' . $_GET['product_id'] . ' добавлен в список пожеланий.'
);

//$arr = array(
//	'status'  => 'error',
//	'message' => 'Извините, c товаром ' . $_GET['product_id'] . ' проблемы.'
//);
sleep(1);
echo json_encode( $arr );
