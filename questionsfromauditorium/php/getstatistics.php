<?php
require_once 'dbconnect.php';

$value = $_REQUEST['value'];
$perPage = 5;

$statistics = array();

$sql = 'SELECT Text, statuses.Name FROM question LEFT JOIN statuses ON Status = statuses.ID ORDER BY question.ID LIMIT ?, ?';
$stmt = $dbh->prepare($sql);
$stmt->bindValue(1, ($value - 1) * $perPage, PDO::PARAM_INT);
$stmt->bindValue(2, $perPage, PDO::PARAM_INT);
$stmt->execute();
$data = $stmt->fetchAll();

foreach ($data as $row)
{
    array_push($statistics,
        array(
            "Text" => $row['Text'],
            "Name" => $row['Name'])
    );
}

echo json_encode($statistics);