<?php
declare(strict_types=1);

function authGetCsrf(): never
{
    jsonResponse(200, [
        'csrf_token' => generateCsrfToken()
    ]);
}

function authLogin(mysqli $conn): never
{
    $data = json_decode(file_get_contents('php://input'), true);

    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if ($email === '' || $password === '') {
        jsonResponse(422, [], 'Email and password are required');
    }

    $stmt = $conn->prepare(
        'SELECT id, name, email, password_hash, role, is_active
         FROM users
         WHERE email = ?
         LIMIT 1'
    );

    $stmt->bind_param('s', $email);
    $stmt->execute();

    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (
        !$user
        || !password_verify($password, $user['password_hash'])
        || (int) $user['is_active'] !== 1
    ) {
        jsonResponse(401, [], 'Invalid email or password');
    }

    session_regenerate_id(true);

    $_SESSION['user_id'] = (int) $user['id'];
    $_SESSION['last_activity'] = time();

    unset($user['password_hash'], $user['is_active']);

    jsonResponse(200, [
        'user' => $user
    ], 'Login successful');
}

function authMe(mysqli $conn): never
{
    if (empty($_SESSION['user_id'])) {
        jsonResponse(401, [], 'Authentication required');
    }

    $userId = (int) $_SESSION['user_id'];

    $stmt = $conn->prepare(
        'SELECT id, name, email, role, is_active
         FROM users
         WHERE id = ?
         LIMIT 1'
    );

    $stmt->bind_param('i', $userId);
    $stmt->execute();

    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$user || (int) $user['is_active'] !== 1) {
        destroyAppSession();
        jsonResponse(401, [], 'Authentication required');
    }

    unset($user['is_active']);

    jsonResponse(200, [
        'user' => $user
    ]);
}

function authLogout(): never
{
    destroyAppSession();

    jsonResponse(200, [], 'Logout successful');
}
