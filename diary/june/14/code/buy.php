<?php
header('Content-Type: application/json;charset=utf-8;');

$arr = array(
    'status' => 'success',
    'message' => 'Товар ' . $_GET['product_id'] . ' добавлен в корзину'
);

//$arr = array(
//	'status'  => 'error',
//	'message' => 'Извините, товар ' . $_GET['product_id'] . ' уже кто-то купил.'
//);

sleep(1); // Имитируем задержку ответа, чтоб показать крутилку

echo json_encode($arr);
