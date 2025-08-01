<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações do Facebook Conversion API
$accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN'; // Substitua pelo seu token
$pixelId = '67edf4c3c10671e61577006d'; // ID do pixel da Paula Dantas

// Função para enviar evento para o Facebook Conversion API
function sendToFacebookConversionAPI($eventName, $customData) {
    global $accessToken, $pixelId;
    
    $data = [
        'data' => [
            [
                'event_name' => $eventName,
                'event_time' => time(),
                'action_source' => 'website',
                'event_source_url' => $_SERVER['HTTP_REFERER'] ?? '',
                'user_data' => [
                    'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
                    'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
                ],
                'custom_data' => $customData
            ]
        ],
        'access_token' => $accessToken
    ];
    
    $url = "https://graph.facebook.com/v17.0/{$pixelId}/events";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'success' => $httpCode === 200,
        'response' => json_decode($response, true),
        'http_code' => $httpCode
    ];
}

// Processar requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input && isset($input['eventName']) && isset($input['customData'])) {
        $result = sendToFacebookConversionAPI($input['eventName'], $input['customData']);
        
        echo json_encode([
            'success' => $result['success'],
            'message' => $result['success'] ? 'Evento enviado com sucesso' : 'Erro ao enviar evento',
            'details' => $result
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Dados inválidos'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
}
?> 