<?php
require_once 'dbconnect.php';

session_start();
if (!(isset($_SESSION['authorized']) && $_SESSION['authorized'] === 1))
{
    echo '0x3';
    return;
}

$questions = array();
foreach ($dbh->query('SELECT question.ID, Text, statuses.Name FROM question 
LEFT JOIN statuses ON Status = statuses.ID 
WHERE statuses.Name = "на модерации"') as $row)
{
    array_push($questions,
        array(
            "ID" => $row['ID'],
            "Text" => $row['Text'],
            "Name" => $row['Name'])
    );
}

echo json_encode($questions);