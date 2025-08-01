<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações do banco de dados (ajuste conforme necessário)
$host = 'localhost';
$dbname = 'paula_donations';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro de conexão com banco de dados: ' . $e->getMessage()
    ]);
    exit;
}

// Processar requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input) {
        try {
            // Preparar dados para inserção
            $orderData = [
                'external_id' => $input['external_id'] ?? '',
                'order_id' => $input['orderId'] ?? '',
                'platform' => $input['platform'] ?? '',
                'payment_method' => $input['paymentMethod'] ?? '',
                'status' => $input['status'] ?? '',
                'created_at' => $input['createdAt'] ?? date('Y-m-d H:i:s'),
                'approved_date' => $input['approvedDate'] ?? null,
                'refunded_at' => $input['refundedAt'] ?? null,
                'customer_name' => $input['customer']['name'] ?? '',
                'customer_document' => $input['customer']['document'] ?? '',
                'total_amount' => $input['commission']['totalPriceInCents'] ?? 0,
                'commission_amount' => $input['commission']['userCommissionInCents'] ?? 0,
                'currency' => $input['commission']['currency'] ?? 'BRL',
                'utm_source' => $input['trackingParameters']['utm_source'] ?? '',
                'utm_medium' => $input['trackingParameters']['utm_medium'] ?? '',
                'utm_campaign' => $input['trackingParameters']['utm_campaign'] ?? '',
                'utm_content' => $input['trackingParameters']['utm_content'] ?? '',
                'utm_term' => $input['trackingParameters']['utm_term'] ?? '',
                'src' => $input['trackingParameters']['src'] ?? '',
                'sck' => $input['trackingParameters']['sck'] ?? '',
                'is_test' => $input['isTest'] ?? false
            ];
            
            // SQL para inserir pedido
            $sql = "INSERT INTO orders (
                external_id, order_id, platform, payment_method, status, 
                created_at, approved_date, refunded_at, customer_name, 
                customer_document, total_amount, commission_amount, currency,
                utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                src, sck, is_test
            ) VALUES (
                :external_id, :order_id, :platform, :payment_method, :status,
                :created_at, :approved_date, :refunded_at, :customer_name,
                :customer_document, :total_amount, :commission_amount, :currency,
                :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term,
                :src, :sck, :is_test
            )";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($orderData);
            
            $orderId = $pdo->lastInsertId();
            
            // Salvar produtos do pedido
            if (isset($input['products']) && is_array($input['products'])) {
                foreach ($input['products'] as $product) {
                    $productData = [
                        'order_id' => $orderId,
                        'product_id' => $product['id'] ?? '',
                        'title' => $product['title'] ?? '',
                        'unit_price' => $product['unitPrice'] ?? 0,
                        'quantity' => $product['quantity'] ?? 1,
                        'tangible' => $product['tangible'] ?? false
                    ];
                    
                    $productSql = "INSERT INTO order_products (
                        order_id, product_id, title, unit_price, quantity, tangible
                    ) VALUES (
                        :order_id, :product_id, :title, :unit_price, :quantity, :tangible
                    )";
                    
                    $productStmt = $pdo->prepare($productSql);
                    $productStmt->execute($productData);
                }
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Pedido salvo com sucesso',
                'order_id' => $orderId
            ]);
            
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Erro ao salvar pedido: ' . $e->getMessage()
            ]);
        }
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