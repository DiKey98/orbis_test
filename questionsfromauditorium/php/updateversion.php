<?php

function updateversion($dbh)
{
    $version = 0;

    foreach ($dbh->query('SELECT Version FROM version WHERE ID=1') as $row)
    {
        $version = (int)$row['Version'];
    }

    $stmt = $dbh->prepare('UPDATE version SET Version = ? WHERE ID= 1');
    $stmt->execute(array($version + 1));
}