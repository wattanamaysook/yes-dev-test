<?php
declare(strict_types=1);
require_once __DIR__ . '/../controllers/DashboardController.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = [
    'GET /api/auth/csrf' => 'authGetCsrf',
    'POST /api/auth/login' => 'authLogin',
    'GET /api/auth/me' => 'authMe',
    'POST /api/auth/logout' => 'authLogout',
    //แดชบอร์ด
    'GET /api/dashboard/stats' => 'dashboardGetStats',
];

$key = $method . ' ' . $path;
if (!isset($routes[$key])) {
    jsonResponse(404, [], 'Endpoint not found');
}

$action = $routes[$key];

if ($method !== 'GET') {
    verifyCsrfToken();
}

if (
    $action === 'authLogin' ||
    $action === 'authMe' ||
    $action === 'dashboardGetStats'
) {
    $action($conn);
} else {
    $action();
}
