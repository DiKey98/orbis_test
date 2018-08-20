<?php

$true_login = "dikey512";
$true_password = "12345";

$login = $_REQUEST['login'];
$password = $_REQUEST['password'];

ini_set('session.cookie_lifetime', 3600*24*30);
session_start();

if (isset($_SESSION['authorized']) && $_SESSION['authorized'] == 1)
{
    echo '0x0';
    return;
}

if ($login !== $true_login)
{
    echo '0x1';
    return;
}

if ($password !== $true_password)
{
    echo '0x2';
    return;
}

$_SESSION['authorized'] = 1;

echo '0x0';
