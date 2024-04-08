<?php


$host = 'mysql2_docker_compose'; // Nom du service dans Docker Compose
$db   = 'dockerComposeLamp';
$user = 'root';
$pass = 'root';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "Connexion établie !";
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

$sql = 'SELECT * FROM user';
$stmt = $pdo->query($sql);

while ($row = $stmt->fetch()) {
    echo htmlspecialchars($row['nom']) . ' - ' . htmlspecialchars($row['prenom']) . "<br />\n";
}

