@echo off
echo ========================================
echo Preparando arquivos para upload no Plesk
echo ========================================

REM Criar pasta para upload
if exist "upload-ready" rmdir /s /q "upload-ready"
mkdir "upload-ready"

echo.
echo Copiando arquivos principais...

REM Copiar arquivos principais
copy "index.html" "upload-ready\"
copy "utm-script.js" "upload-ready\"

REM Copiar pastas necessárias
xcopy "images" "upload-ready\images\" /e /i /y
xcopy "css" "upload-ready\css\" /e /i /y
xcopy "js" "upload-ready\js\" /e /i /y
xcopy "api" "upload-ready\api\" /e /i /y
xcopy "obrigado" "upload-ready\obrigado\" /e /i /y

echo.
echo Removendo arquivos desnecessários...

REM Remover arquivos de teste
del "upload-ready\teste-*.html" 2>nul
del "upload-ready\exemplo-uso-utm.html" 2>nul
del "upload-ready\README*.md" 2>nul

REM Remover arquivos de configuração Git
if exist "upload-ready\.git" rmdir /s /q "upload-ready\.git"
if exist "upload-ready\.gitignore" del "upload-ready\.gitignore"

echo.
echo ========================================
echo Arquivos preparados em: upload-ready/
echo ========================================
echo.
echo Arquivos incluidos:
dir "upload-ready" /b
echo.
echo Pasta "upload-ready" pronta para upload!
pause 