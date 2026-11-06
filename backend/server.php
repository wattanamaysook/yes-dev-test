<?php
declare(strict_types=1);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Let PHP serve frontend files normally.
if (!str_starts_with($path, '/api/')) {
    return false;
}

require_once __DIR__ . '/core/response.php';
require_once __DIR__ . '/core/session.php';
require_once __DIR__ . '/core/csrf.php';
require_once __DIR__ . '/controllers/AuthController.php';

startAppSession();

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/routes/api.php';
