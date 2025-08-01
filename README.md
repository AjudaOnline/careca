# Site do Kaleb - Melhorias Implementadas

Este projeto contém todas as melhorias implementadas no site do Kaleb, incluindo sistema de notificações, PIX integrado, tracking UTM e Facebook Pixel.

## 🚀 Funcionalidades Implementadas

### 1. Sistema de Notificações Toast
- Notificações em tempo real de doações
- Animações suaves e responsivas
- Personalização com nomes brasileiros
- Atualização automática da barra de progresso

### 2. Sistema de PIX Integrado
- Geração automática de QR Code PIX
- Modal responsivo com instruções
- Copiar código PIX com um clique
- Verificação automática de pagamento
- Redirecionamento para página de agradecimento

### 3. Tracking UTM
- Captura automática de parâmetros UTM
- Aplicação em todos os links de checkout
- Suporte para múltiplas plataformas de pagamento
- Debug e logs detalhados

### 4. Facebook Pixel e Conversion API
- Tracking de eventos InitiateCheckout
- Tracking de eventos Purchase
- Conversion API server-side
- Configuração personalizada para o Kaleb

### 5. Modais e UX
- Modal de loading durante geração do PIX
- Modal de erro com mensagens claras
- Animações de progresso
- Interface responsiva

## 📁 Estrutura de Arquivos

```
kaleb/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principais
│   ├── modal.css           # Estilos dos modais
│   └── toast.css           # Estilos das notificações
├── js/
│   ├── script.js           # Script principal
│   ├── toast.js            # Sistema de notificações
│   ├── pix.js              # Sistema de PIX
│   └── qrcode.min.js       # Biblioteca QR Code
├── api/
│   ├── fb_conversion_api.php  # Facebook Conversion API
│   ├── save_order.php         # Salvamento de pedidos
│   └── database.sql           # Estrutura do banco
└── utm-script.js           # Script de tracking UTM
```

## ⚙️ Configuração

### 1. Banco de Dados
Execute o arquivo `api/database.sql` no seu MySQL para criar as tabelas necessárias.

### 2. Facebook Pixel
1. Substitua `YOUR_FACEBOOK_ACCESS_TOKEN` no arquivo `api/fb_conversion_api.php`
2. Verifique se o `pixelId` está correto (atualmente: 67edf4c3c10671e61577006d)

### 3. Configuração do Banco
Ajuste as configurações de conexão no arquivo `api/save_order.php`:
```php
$host = 'localhost';
$dbname = 'kaleb_donations';
$username = 'seu_usuario';
$password = 'sua_senha';
```

### 4. API de PIX
O sistema está configurado para usar as APIs:
- Geração: `https://api-production-0feb3.up.railway.app/g5`
- Verificação: `https://api-production-0feb.up.railway.app/verify5`

## 🎯 Como Funciona

### Notificações Toast
- Aparecem automaticamente a cada 5-20 segundos
- Mostram doações fictícias para criar urgência social
- Atualizam a barra de progresso em tempo real
- Usam localStorage para persistir valores

### Sistema PIX
1. Usuário clica em um botão de doação
2. Sistema gera dados de cliente automaticamente
3. API cria PIX com QR Code
4. Modal mostra QR Code e código para copiar
5. Sistema verifica pagamento a cada 5 segundos
6. Após confirmação, redireciona para agradecimento

### Tracking UTM
1. Script captura parâmetros UTM da URL
2. Aplica automaticamente em todos os links de checkout
3. Mantém tracking através de todo o funil
4. Logs detalhados no console para debug

## 🔧 Personalização

### Valores de Doação
Edite o array `valoresDoacao` em `js/toast.js` para alterar os valores das notificações.

### Meta de Arrecadação
Ajuste `valorMeta` em `js/toast.js` (atualmente R$ 200.000,00).

### Nomes Brasileiros
Modifique o array `nomesBrasileiros` em `js/toast.js` para personalizar os nomes das notificações.

### Cores e Estilos
Edite os arquivos CSS para personalizar cores, fontes e animações.

## 📊 Tracking e Analytics

### Eventos Facebook Pixel
- `InitiateCheckout`: Quando usuário clica em doar
- `Purchase`: Quando pagamento é confirmado

### Parâmetros UTM Suportados
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- xcod
- src
- sck

## 🚨 Importante

1. **Configure o Facebook Access Token** antes de usar
2. **Ajuste as configurações do banco** conforme seu ambiente
3. **Teste em ambiente de desenvolvimento** antes de produção
4. **Monitore os logs** para identificar problemas
5. **Backup regular** dos dados de doações

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Console do navegador para erros JavaScript
2. Logs do servidor para erros PHP
3. Configurações de banco de dados
4. Tokens e chaves de API

---

**Desenvolvido com ❤️ para ajudar o Kaleb** 