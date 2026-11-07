<?php

declare(strict_types=1);

/**
 * Dashboard Controller
 * Handles dashboard statistics.
 */

function dashboardGetStats(mysqli $conn): void
{
        // ตรวจสอบว่าผู้ใช้ Login แล้วหรือยัง
    if (empty($_SESSION['user_id'])) {
        jsonResponse(401, [], 'Authentication required');
        return;
    }
    
    $sql = "
        SELECT
            (SELECT COUNT(*) FROM products) AS total_products,
            (SELECT COUNT(*) FROM products WHERE is_active = 1) AS active_products,
            (SELECT COUNT(*) FROM scan_logs) AS total_scans
    ";

    $result = $conn->query($sql);

    if (!$result) {
        jsonResponse(500, [], 'Failed to retrieve dashboard statistics');
        return;
    }

    $stats = $result->fetch_assoc();

    jsonResponse(200, [
        'data' => [
            'total_products' => (int) $stats['total_products'],
            'active_products' => (int) $stats['active_products'],
            'total_scans' => (int) $stats['total_scans'],
        ]
    ], 'Dashboard statistics retrieved successfully');
}
