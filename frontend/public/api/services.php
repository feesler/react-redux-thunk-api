<?php

function decode($str)
{
    $asArray = true;
    $depth = 512;
    $fdata = rawurldecode($str);

    return json_decode($fdata, $asArray, $depth, JSON_THROW_ON_ERROR);
}

function encode($obj)
{
    return json_encode($obj, JSON_UNESCAPED_UNICODE);
}

if (!session_id()) {
    session_start();
}

if (!isset($_SESSION["services"])) {
    $nextId = 1;
    $services = [
        ["id" => $nextId++, "name" => "Замена стекла", "price" => 21000, "content" => "Стекло оригинал от Apple"],
        ["id" => $nextId++, "name" => "Замена дисплея", "price" => 25000, "content" => "Дисплей оригинал от Foxconn"],
        ["id" => $nextId++, "name" => "Замена аккумулятора", "price" => 4000, "content" => "Новый на 4000 mAh"],
        ["id" => $nextId++, "name" => "Замена микрофона", "price" => 2500, "content" => "Оригинальный от Apple"],
    ];
} else {
    $services = decode($_SESSION["services"] ?? "[]");
    $nextId = intval($_SESSION["nextId"]);
}

$isPOST = $_SERVER["REQUEST_METHOD"] == "POST";
$isDELETE = $_SERVER["REQUEST_METHOD"] == "DELETE";

if ($isPOST) {
    $input = file_get_contents("php://input");
    $requestData = decode($input);

    $isUpdate = intval($requestData["id"] ?? 0) !== 0;
    if ($isUpdate) {
        foreach ($services as $ind => $item) {
            if ($item["id"] === $requestData["id"]) {
                $services[$ind] = $requestData;
            }
        }
    } else {
        $requestData["id"] = $nextId;
        $nextId++;

        $services[] = $requestData;
    }
} else if ($isDELETE) {
    $route = $_GET["route"];
    $routeParts = explode("/", $route);
    $itemId = intval($routeParts[1] ?? 0);

    $res = [];
    foreach ($services as $item) {
        if ($item["id"] !== $itemId) {
            $res[] = $item;
        }
    }

    $services = $res;
} else {
    $route = $_GET["route"];
    $routeParts = explode("/", $route);
    $itemId = intval($routeParts[1] ?? 0);

    if ($itemId === 0) {
        $res = (array)$services;
    } else {
        $res = null;

        foreach ($services as $item) {
            if ($item["id"] === $itemId) {
                $res = $item;
                break;
            }
        }
    }

    if (is_null($res)) {
        header("HTTP/1.1 404 Not Found", true, 404);
        exit;
    }

    echo encode($res);
}

$_SESSION["services"] = encode((array)$services);
$_SESSION["nextId"] = $nextId;

if ($isPOST || $isDELETE) {
    header("HTTP/1.1 204 No Content", true, 204);
}
