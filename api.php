<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dataDir = __DIR__ . '/data';
$dataFile = $dataDir . '/database.json';

$defaultData = [
    'accounts' => [
        [
            'id' => 'keen-developer',
            'name' => 'Keen',
            'login' => 'keen',
            'email' => 'keen',
            'password' => 'keen1488',
            'role' => 'developer',
            'category' => 'office',
            'department' => 'Разработка',
            'status' => 'Активен',
            'access' => 'Полный доступ',
        ],
    ],
    'materials' => [],
    'dayReports' => [],
    'deals' => [],
];

function ensureStorage(string $dataDir, string $dataFile, array $defaultData): void
{
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    if (!file_exists($dataFile)) {
        file_put_contents(
            $dataFile,
            json_encode($defaultData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
            LOCK_EX
        );
    }
}

function readDatabase(string $dataFile, array $defaultData): array
{
    $raw = file_get_contents($dataFile);
    $data = json_decode($raw ?: '', true);
    if (!is_array($data)) {
        $data = $defaultData;
    }

    foreach ($defaultData as $key => $value) {
        if (!isset($data[$key]) || !is_array($data[$key])) {
            $data[$key] = $value;
        }
    }

    return $data;
}

function writeDatabase(string $dataFile, array $data): void
{
    file_put_contents(
        $dataFile,
        json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
        LOCK_EX
    );
}

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function findActor(array $accounts, string $actorId): ?array
{
    foreach ($accounts as $account) {
        if (($account['id'] ?? '') === $actorId) {
            return $account;
        }
    }

    return null;
}

function canSaveCollection(string $collection, ?array $actor): bool
{
    $role = $actor['role'] ?? '';
    $canManage = in_array($role, ['developer', 'admin'], true);

    if (in_array($collection, ['accounts', 'materials'], true)) {
        return $canManage;
    }

    if ($collection === 'dayReports') {
        return $canManage || in_array($role, ['employee', 'request-rkn', 'closer'], true);
    }

    if ($collection === 'deals') {
        return $canManage || $role === 'closer';
    }

    return false;
}

ensureStorage($dataDir, $dataFile, $defaultData);

$action = $_GET['action'] ?? 'load';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$data = readDatabase($dataFile, $defaultData);

if ($method === 'GET' && $action === 'load') {
    respond(['ok' => true, 'data' => $data]);
}

if ($method !== 'POST') {
    respond(['ok' => false, 'message' => 'Метод не поддерживается.'], 405);
}

$input = json_decode(file_get_contents('php://input') ?: '{}', true);
if (!is_array($input)) {
    respond(['ok' => false, 'message' => 'Некорректный JSON.'], 400);
}

if ($action === 'save') {
    $collection = $input['collection'] ?? '';
    $allowed = ['accounts', 'materials', 'dayReports', 'deals'];

    if (!in_array($collection, $allowed, true)) {
        respond(['ok' => false, 'message' => 'Неизвестный раздел данных.'], 400);
    }

    $items = $input['items'] ?? null;
    if (!is_array($items)) {
        respond(['ok' => false, 'message' => 'Данные должны быть списком.'], 400);
    }

    $actor = findActor($data['accounts'], (string)($input['actorId'] ?? ''));
    if (!canSaveCollection($collection, $actor)) {
        respond(['ok' => false, 'message' => 'Недостаточно прав для сохранения.'], 403);
    }

    $data[$collection] = $items;
    writeDatabase($dataFile, $data);
    respond(['ok' => true, 'data' => $data]);
}

if ($action === 'save-all') {
    $actor = findActor($data['accounts'], (string)($input['actorId'] ?? ''));
    $role = $actor['role'] ?? '';
    if (!in_array($role, ['developer', 'admin'], true)) {
        respond(['ok' => false, 'message' => 'Недостаточно прав для сохранения.'], 403);
    }

    foreach (['accounts', 'materials', 'dayReports', 'deals'] as $collection) {
        if (isset($input[$collection]) && is_array($input[$collection])) {
            $data[$collection] = $input[$collection];
        }
    }

    writeDatabase($dataFile, $data);
    respond(['ok' => true, 'data' => $data]);
}

respond(['ok' => false, 'message' => 'Неизвестное действие.'], 404);
