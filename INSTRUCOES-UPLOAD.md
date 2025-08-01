# 📤 Instruções para Upload no Plesk - Paula Dantas

## 🚀 Preparação dos Arquivos

### 1. Execute o Script de Preparação
```bash
# No Windows, execute:
prepare-for-upload.bat
```

### 2. Verifique a Pasta "upload-ready"
Após executar o script, você terá uma pasta `upload-ready/` com apenas os arquivos necessários:

```
upload-ready/
├── index.html              # Página principal da Paula Dantas
├── utm-script.js           # Script de rastreamento UTM
├── images/                 # Imagens da campanha
├── css/                    # Estilos CSS
├── js/                     # Scripts JavaScript
├── api/                    # APIs do Facebook
└── obrigado/              # Página de agradecimento
```

## 📁 Upload no Plesk

### 1. Acesse o Plesk
- Faça login no painel do Plesk da Value Host
- Acesse o domínio onde vai hospedar o site

### 2. Upload dos Arquivos
- Vá em **"Arquivos"** ou **"File Manager"**
- Navegue até a pasta `httpdocs` ou `public_html`
- **Delete todos os arquivos existentes** (se houver)
- Faça upload de **TODOS** os arquivos da pasta `upload-ready/`

### 3. Estrutura Final no Servidor
```
public_html/
├── index.html
├── utm-script.js
├── images/
│   ├── paula1.jpg
│   ├── paula2.jpeg
│   ├── paula3.jpg
│   ├── logo.webp
│   ├── favi.webp
│   └── ... (outras imagens)
├── css/
│   ├── styles.css
│   ├── modal.css
│   ├── toast.css
│   └── ... (outros CSS)
├── js/
│   ├── paula-config.js
│   ├── script.js
│   ├── pix.js
│   ├── toast.js
│   └── ... (outros JS)
├── api/
│   ├── fb_conversion_api.php
│   ├── save_order.php
│   └── database.sql
└── obrigado/
    ├── index.html
    ├── css/
    └── images/
```

## ⚙️ Configurações Importantes

### 1. Permissões de Arquivos
Certifique-se que os arquivos tenham as permissões corretas:
- **Arquivos**: 644
- **Pastas**: 755
- **PHP**: 644

### 2. Configuração do Banco de Dados
1. Acesse **"Bancos de Dados"** no Plesk
2. Crie um novo banco de dados chamado `paula_donations`
3. Importe o arquivo `api/database.sql`
4. Atualize as credenciais em `api/save_order.php` e `api/fb_conversion_api.php`

### 3. Configuração do Facebook Pixel
1. Abra `api/fb_conversion_api.php`
2. Substitua `YOUR_FACEBOOK_ACCESS_TOKEN` pelo token real
3. Verifique se o Pixel ID está correto: `67edf4c3c10671e61577006d`

## 🔍 Testes Após Upload

### 1. Teste da Página Principal
- Acesse: `https://seudominio.com/`
- Verifique se a página carrega corretamente
- Teste os botões de doação

### 2. Teste dos Parâmetros UTM
- Acesse: `https://seudominio.com/?utm_source=facebook&utm_campaign=teste`
- Abra o console do navegador (F12)
- Verifique se aparecem os logs: `🎗️ [Paula] Sistema de rastreamento UTM inicializado`

### 3. Teste da Página de Agradecimento
- Acesse: `https://seudominio.com/obrigado/`
- Verifique se a página carrega corretamente

## 🚨 Problemas Comuns

### Erro 500 - Internal Server Error
- Verifique as permissões dos arquivos
- Confirme se o PHP está habilitado
- Verifique os logs de erro no Plesk

### Página não carrega
- Verifique se o `index.html` está na raiz
- Confirme se todos os arquivos foram uploadados
- Verifique se não há arquivos corrompidos

### Links não funcionam
- Verifique se os links de checkout estão corretos
- Confirme se o JavaScript está carregando
- Teste no console do navegador

### Facebook Pixel não funciona
- Verifique se o token do Facebook está correto
- Confirme se o Pixel ID está correto
- Teste no Facebook Events Manager

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs de erro no Plesk
2. Teste no console do navegador (F12)
3. Confirme se todos os arquivos estão presentes
4. Verifique as permissões dos arquivos

---

**✅ Após seguir estas instruções, o site da Paula Dantas estará funcionando perfeitamente no Plesk!** 