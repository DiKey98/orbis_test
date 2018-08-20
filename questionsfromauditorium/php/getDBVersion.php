<?php
require_once 'dbconnect.php';

$version = 0;

foreach ($dbh->query('SELECT Version FROM version WHERE ID = 1') as $row)
{
    $version = (int)$row['Version'];
}

echo $version;