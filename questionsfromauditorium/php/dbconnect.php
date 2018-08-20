<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=questions;charset=UTF8', 'root', '');
    $dbh->query('SELECT * from statuses');
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}