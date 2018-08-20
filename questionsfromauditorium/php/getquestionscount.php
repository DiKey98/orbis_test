<?php
require_once 'dbconnect.php';

$count = 0;
foreach ($dbh->query('SELECT COUNT(ID) FROM question') as $row)
{
    $count = $row['COUNT(ID)'];
}

echo $count;