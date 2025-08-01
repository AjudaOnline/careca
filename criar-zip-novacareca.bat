@echo off
echo ========================================
echo Criando ZIP da pasta novacareca
echo ========================================

REM Remover ZIP anterior se existir
if exist "novacareca-site.zip" del "novacareca-site.zip"

REM Criar ZIP usando PowerShell
powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('novacareca', 'novacareca-site.zip')"

if exist "novacareca-site.zip" (
    echo.
    echo ========================================
    echo ZIP criado com sucesso: novacareca-site.zip
    echo ========================================
    echo.
    echo Tamanho do arquivo:
    dir "novacareca-site.zip"
) else (
    echo.
    echo ERRO: Não foi possível criar o ZIP
)

pause 