<?php

session_start();
$_SESSION['authorized'] = '0';
unset($_SESSION);