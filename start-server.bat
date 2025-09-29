@echo off
chcp 65001 >nul
echo ========================================
echo Sistema de Gestao de Qualidade ASCH-OHLA
echo ========================================
echo.
echo Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERRO: Falha ao instalar dependencias
        pause
        exit /b 1
    )
) else (
    echo Dependencias ja instaladas
)
echo.
echo Iniciando servidor de desenvolvimento...
echo.
echo O site estara disponivel em:
echo - http://localhost:5173
echo - http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
call npm run dev
pause