<?php
require_once 'dbconnect.php';
require_once 'updateversion.php';

$id = $_REQUEST['id'];
$status_id = 0;

foreach ($dbh->query('SELECT ID FROM statuses WHERE Name="одобренный"') as $row)
{
    $status_id = (int)$row['ID'];
}

foreach ($dbh->query('SELECT Version FROM version WHERE ID=1') as $row)
{
    $version = (int)$row['Version'];
}

$stmt = $dbh->prepare('UPDATE question SET Status = ? WHERE ID= ?');
$stmt->execute(array($status_id, $id));

$stmt = $dbh->prepare('INSERT INTO approvedorder(ID_Question) VALUES (?)');
$stmt->execute(array($id));

updateversion($dbh);