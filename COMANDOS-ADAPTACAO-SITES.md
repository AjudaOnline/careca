# 🚀 Comandos para Adaptar Sites do GitHub para Plesk

## 📋 **Resumo dos Comandos Utilizados**

### 1. **Criar Pasta de Trabalho**
```bash
mkdir nome-do-site
```

### 2. **Copiar Arquivos Principais**
```bash
# Copiar arquivo principal
xcopy "index.html" "nome-do-site\" /y

# Copiar scripts principais
xcopy "*.js" "nome-do-site\" /y
```

### 3. **Copiar Pastas Completas**
```bash
# Copiar imagens
xcopy "images" "nome-do-site\images\" /e /i /y

# Copiar CSS
xcopy "css" "nome-do-site\css\" /e /i /y

# Copiar JavaScript
xcopy "js" "nome-do-site\js\" /e /i /y

# Copiar APIs (se houver)
xcopy "api" "nome-do-site\api\" /e /i /y

# Copiar páginas adicionais
xcopy "obrigado" "nome-do-site\obrigado\" /e /i /y
```

### 4. **Verificar Estrutura**
```bash
# Listar conteúdo da pasta criada
dir "nome-do-site"

# Verificar subpastas
dir "nome-do-site\js"
dir "nome-do-site\css"
dir "nome-do-site\images"
```

### 5. **Criar ZIP (Opcional)**
```bash
# Usando PowerShell
powershell -Command "Compress-Archive -Path 'nome-do-site\*' -DestinationPath 'nome-do-site.zip' -Force"

# Ou usando script batch
.\criar-zip-site.bat
```

## 🔧 **Script Batch Completo**

Crie um arquivo `preparar-site.bat`:

```batch
@echo off
echo ========================================
echo Preparando site para upload no Plesk
echo ========================================

REM Nome do site (altere conforme necessário)
set SITE_NAME=nome-do-site

REM Criar pasta para upload
if exist "%SITE_NAME%" rmdir /s /q "%SITE_NAME%"
mkdir "%SITE_NAME%"

echo.
echo Copiando arquivos principais...

REM Copiar arquivos principais
copy "index.html" "%SITE_NAME%\"
copy "*.js" "%SITE_NAME%\" 2>nul

REM Copiar pastas necessárias
xcopy "images" "%SITE_NAME%\images\" /e /i /y
xcopy "css" "%SITE_NAME%\css\" /e /i /y
xcopy "js" "%SITE_NAME%\js\" /e /i /y
xcopy "api" "%SITE_NAME%\api\" /e /i /y 2>nul
xcopy "obrigado" "%SITE_NAME%\obrigado\" /e /i /y 2>nul

echo.
echo Removendo arquivos desnecessários...

REM Remover arquivos de teste
del "%SITE_NAME%\teste-*.html" 2>nul
del "%SITE_NAME%\exemplo-*.html" 2>nul
del "%SITE_NAME%\README*.md" 2>nul

REM Remover arquivos de configuração Git
if exist "%SITE_NAME%\.git" rmdir /s /q "%SITE_NAME%\.git"
if exist "%SITE_NAME%\.gitignore" del "%SITE_NAME%\.gitignore"

echo.
echo ========================================
echo Arquivos preparados em: %SITE_NAME%/
echo ========================================
echo.
echo Arquivos incluidos:
dir "%SITE_NAME%" /b
echo.
echo Pasta "%SITE_NAME%" pronta para upload!
pause
```

## 📁 **Estrutura Típica de um Site**

```
nome-do-site/
├── index.html              # Página principal
├── *.js                    # Scripts principais
├── images/                 # Imagens
│   ├── logo.png
│   ├── favicon.ico
│   └── ... (outras imagens)
├── css/                    # Estilos
│   ├── styles.css
│   ├── responsive.css
│   └── ... (outros CSS)
├── js/                     # Scripts
│   ├── main.js
│   ├── config.js
│   └── ... (outros JS)
├── api/                    # APIs (se houver)
│   ├── *.php
│   └── *.sql
└── obrigado/              # Páginas adicionais (se houver)
    ├── index.html
    └── css/
```

## 🚀 **Passos para Qualquer Site**

### 1. **Preparação**
```bash
# Navegar para a pasta do projeto
cd caminho/para/o/projeto

# Criar pasta de trabalho
mkdir nome-do-site
```

### 2. **Cópia de Arquivos**
```bash
# Arquivos principais
xcopy "index.html" "nome-do-site\" /y
xcopy "*.js" "nome-do-site\" /y

# Pastas
xcopy "images" "nome-do-site\images\" /e /i /y
xcopy "css" "nome-do-site\css\" /e /i /y
xcopy "js" "nome-do-site\js\" /e /i /y
xcopy "api" "nome-do-site\api\" /e /i /y 2>nul
xcopy "obrigado" "nome-do-site\obrigado\" /e /i /y 2>nul
```

### 3. **Limpeza**
```bash
# Remover arquivos desnecessários
del "nome-do-site\teste-*.html" 2>nul
del "nome-do-site\README*.md" 2>nul
del "nome-do-site\.gitignore" 2>nul
```

### 4. **Verificação**
```bash
# Verificar estrutura
dir "nome-do-site"
dir "nome-do-site\js"
dir "nome-do-site\css"
dir "nome-do-site\images"
```

## ⚙️ **Configurações Específicas**

### Para Sites com PHP
```bash
# Verificar se há arquivos PHP
dir "*.php"

# Copiar arquivos PHP
xcopy "*.php" "nome-do-site\" /y
```

### Para Sites com Banco de Dados
```bash
# Verificar arquivos SQL
dir "*.sql"

# Copiar arquivos SQL
xcopy "*.sql" "nome-do-site\" /y
```

### Para Sites com Configurações Específicas
```bash
# Verificar arquivos de configuração
dir "config*"
dir "*.json"
dir "*.xml"

# Copiar se necessário
xcopy "config*" "nome-do-site\" /y
xcopy "*.json" "nome-do-site\" /y
```

## 🔍 **Checklist de Verificação**

- ✅ Pasta criada com sucesso
- ✅ Arquivo principal (index.html) copiado
- ✅ Pastas de recursos (images, css, js) copiadas
- ✅ Arquivos de configuração copiados (se houver)
- ✅ Arquivos de teste removidos
- ✅ Arquivos Git removidos
- ✅ Estrutura verificada

## 📤 **Upload no Plesk**

### Método 1: File Manager
1. Acesse o Plesk
2. Vá em **"Arquivos"** ou **"File Manager"**
3. Navegue até `httpdocs` ou `public_html`
4. **Delete arquivos existentes** (se houver)
5. Upload de **TODOS** os arquivos da pasta criada

### Método 2: FTP
1. Use cliente FTP
2. Conecte ao servidor
3. Navegue até `public_html`
4. **Delete arquivos existentes** (se houver)
5. Upload de **TODOS** os arquivos da pasta criada

## 🎯 **Dicas Importantes**

1. **Sempre verifique** se todos os arquivos foram copiados
2. **Remova arquivos desnecessários** (testes, README, .git)
3. **Mantenha a estrutura** de pastas original
4. **Configure permissões** no servidor (644 para arquivos, 755 para pastas)
5. **Teste o site** após o upload

---

## 🎉 **Resultado**

**Com esses comandos, você pode adaptar qualquer site do GitHub para funcionar perfeitamente no Plesk!** 