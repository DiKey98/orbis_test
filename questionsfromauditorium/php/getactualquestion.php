<?php
require_once 'dbconnect.php';

$questions = array();
foreach ($dbh->query('SELECT question.ID, Text FROM question 
RIGHT JOIN approvedorder ON approvedorder.ID_Question = question.ID
WHERE approvedorder.ID = (SELECT MIN(ID) FROM approvedorder)') as $row)
{
    array_push($questions,
        array(
            "ID" => $row['ID'],
            "Text" => $row['Text']
        ));
}

echo json_encode($questions);