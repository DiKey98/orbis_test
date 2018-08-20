<?php
require_once 'dbconnect.php';

session_start();
if (!(isset($_SESSION['authorized']) && $_SESSION['authorized'] === 1))
{
    echo '0x3';
    return;
}

$questions = array();
foreach ($dbh->query('SELECT question.ID, Text FROM question 
RIGHT JOIN approvedorder ON approvedorder.ID_Question = question.ID
ORDER BY approvedorder.ID') as $row)
{
    array_push($questions,
        array(
            "ID" => $row['ID'],
            "Text" => $row['Text']
        ));
}

echo json_encode($questions);