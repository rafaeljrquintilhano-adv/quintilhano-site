<?php
declare(strict_types=1);

// Fallback para hospedagens que priorizam index.php antes de index.html.
$home = __DIR__ . DIRECTORY_SEPARATOR . 'index.html';

if (!is_file($home)) {
    http_response_code(500);
    exit('Página inicial indisponível.');
}

header('Content-Type: text/html; charset=UTF-8');
readfile($home);
