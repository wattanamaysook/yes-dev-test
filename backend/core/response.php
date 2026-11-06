<?php
declare(strict_types=1);

function jsonResponse(
    int $status,
    array $data = [],
    ?string $message = null
): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');

    $response = $data;

    if ($message !== null) {
        $response['message'] = $message;
    }

    echo json_encode(
        $response,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    exit;
}
