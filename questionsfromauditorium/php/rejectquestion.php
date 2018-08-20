<?php
require_once 'dbconnect.php';
require_once 'updateversion.php';

$id = $_REQUEST['id'];
$status_id = 0;

foreach ($dbh->query('SELECT ID FROM statuses WHERE Name="отклонённый"') as $row)
{
    $status_id = (int)$row['ID'];
}

$stmt = $dbh->prepare('UPDATE question SET Status = ? WHERE ID=?');
$stmt->execute(array($status_id, $id));

updateversion($dbh);