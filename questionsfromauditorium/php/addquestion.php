<?php
require_once 'dbconnect.php';
require_once 'updateversion.php';

$status_id = 0;
$question = $_REQUEST['question'];

foreach ($dbh->query('SELECT ID FROM statuses WHERE Name = "на модерации"') as $row)
{
    $status_id = (int)$row;
}

$stmt = $dbh->prepare('INSERT INTO question(Text, Status) VALUES(?, ?)');
$stmt->execute(array($question, $status_id));
$stmt->closeCursor();

updateversion($dbh);