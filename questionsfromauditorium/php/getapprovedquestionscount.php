<?php
require_once 'dbconnect.php';

$count = 0;

foreach ($dbh->query('SELECT COUNT(ID) FROM approvedorder') as $row)
{
    $count = (int)$row['COUNT(ID)'];
}

echo $count;