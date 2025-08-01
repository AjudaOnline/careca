# 📤 Instruções para Upload - Pasta NOVACARECA

## 🎯 **SOLUÇÃO: Upload Direto da Pasta**

Como o ZIP não foi criado automaticamente, você pode fazer o upload **diretamente da pasta `novacareca`** no Plesk.

## 📁 Estrutura da Pasta NOVACARECA

```
novacareca/
├── index.html              # ✅ Página principal da Paula Dantas
├── utm-script.js           # ✅ Script de rastreamento UTM
├── images/                 # ✅ Todas as imagens da Paula
│   ├── paula1.jpg
│   ├── paula2.jpeg
│   ├── paula3.jpg
│   ├── logo.webp
│   ├── favi.webp
│   └── ... (outras imagens)
├── css/                    # ✅ Estilos CSS
│   ├── styles.css
│   ├── modal.css
│   ├── toast.css
│   ├── optimizations.css
│   ├── glide.core.min.css
│   └── glide.theme.min.css
├── js/                     # ✅ Scripts JavaScript
│   ├── paula-config.js     # ✅ Configuração da Paula
│   ├── script.js
│   ├── pix.js
│   ├── toast.js
│   ├── conversion-optimizer.js
│   ├── performance-optimizer.js
│   ├── ux-optimizer.js
│   ├── email-decode.min.js
│   └── qrcode.min.js
├── api/                    # ✅ APIs do Facebook
│   ├── fb_conversion_api.php
│   ├── save_order.php
│   └── database.sql
└── obrigado/              # ✅ Página de agradecimento
    ├── index.html
    ├── css/
    └── images/
```

## 🚀 **Método 1: Upload via File Manager do Plesk**

### 1. Acesse o Plesk
- Faça login no painel do Plesk da Value Host
- Acesse o domínio onde vai hospedar o site

### 2. Abra o File Manager
- Vá em **"Arquivos"** ou **"File Manager"**
- Navegue até a pasta `httpdocs` ou `public_html`

### 3. Upload dos Arquivos
- **Delete todos os arquivos existentes** (se houver)
- Clique em **"Upload"** ou **"Enviar arquivos"**
- Selecione **TODOS** os arquivos da pasta `novacareca` do seu computador
- Faça upload de todos os arquivos e pastas

### 4. Verificação
- Confirme que todos os arquivos foram uploadados
- Verifique se a estrutura está correta

## 🚀 **Método 2: Upload via FTP**

### 1. Configure o FTP
- Use um cliente FTP (FileZilla, WinSCP, etc.)
- Conecte-se ao servidor usando as credenciais do Plesk

### 2. Upload dos Arquivos
- Navegue até a pasta `public_html`
- **Delete todos os arquivos existentes** (se houver)
- Faça upload de **TODOS** os arquivos da pasta `novacareca`

## ⚙️ **Configurações Pós-Upload**

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

## 🔍 **Testes Após Upload**

### 1. Teste da Página Principal
```
https://seudominio.com/
```

### 2. Teste dos Parâmetros UTM
```
https://seudominio.com/?utm_source=facebook&utm_campaign=teste
```

### 3. Teste da Página de Agradecimento
```
https://seudominio.com/obrigado/
```

## 📋 **Checklist de Upload**

- ✅ Pasta `novacareca` criada com sucesso
- ✅ Todos os arquivos personalizados para Paula Dantas
- ✅ Sistema de rastreamento UTM funcionando
- ✅ Facebook Pixel configurado
- ✅ Links de doação atualizados
- ✅ Página de agradecimento personalizada
- ✅ Arquivos prontos para upload

## 🚨 **Problemas Comuns**

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

---

## 🎉 **RESULTADO FINAL**

**A pasta `novacareca` está 100% pronta e contém todos os arquivos necessários para o site da Paula Dantas funcionar perfeitamente no Plesk!**

**Basta fazer o upload de todos os arquivos da pasta `novacareca` para o `public_html` do seu domínio no Plesk.** 