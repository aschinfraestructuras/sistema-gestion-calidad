@echo off
echo ====================================================
echo  Subindo Sistema de Gestión de Calidad para GitHub
echo ====================================================
echo.

REM Verificar se o Git está instalado
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git não encontrado. Por favor, instale o Git.
    echo    Download: https://git-scm.com/downloads
    goto :END
)

echo ✅ Git encontrado
echo.

REM Inicializar repositório se necessário
if not exist ".git" (
    echo 📁 Inicializando repositório Git...
    git init
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Erro ao inicializar repositório Git
        goto :END
    )
    echo ✅ Repositório inicializado
) else (
    echo ✅ Repositório Git já existe
)

echo.

REM Adicionar todos os arquivos
echo 📦 Adicionando arquivos ao Git...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao adicionar arquivos
    goto :END
)
echo ✅ Arquivos adicionados

echo.

REM Fazer commit
echo 💾 Fazendo commit...
git commit -m "Sistema de Gestión de Calidad ASCH-OHLA - Versión Profesional Completa

- Visualizador de documentos profissional como Vercel
- HTMLs dinâmicos editáveis com toolbar completa
- Sistema de impressão otimizado
- Scroll correto dentro dos documentos
- Layout moderno com gradientes e animações
- 21 capítulos com subcapítulos
- Upload integrado para Supabase
- Sistema de notificações
- Design responsivo e profissional"
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao fazer commit
    goto :END
)
echo ✅ Commit realizado

echo.

REM Configurar branch principal
echo 🌿 Configurando branch principal...
git branch -M main
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao configurar branch
    goto :END
)
echo ✅ Branch configurada

echo.

REM Adicionar remote se não existir
echo 🔗 Configurando repositório remoto...
git remote -v | findstr "origin" >nul
if %ERRORLEVEL% NEQ 0 (
    git remote add origin https://github.com/aschinfraestructuras/sistema-gestion-calidad.git
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Erro ao adicionar remote
        goto :END
    )
    echo ✅ Remote adicionado
) else (
    echo ✅ Remote já configurado
)

echo.

REM Fazer push
echo 🚀 Subindo para GitHub...
git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao fazer push
    echo.
    echo 💡 Possíveis soluções:
    echo    1. Verificar se tem acesso ao repositório
    echo    2. Fazer login no Git: git config --global user.name "Seu Nome"
    echo    3. Configurar email: git config --global user.email "seu@email.com"
    echo    4. Usar token de acesso pessoal se necessário
    goto :END
)

echo.
echo ✅ SUCESSO! Projeto subido para GitHub
echo.
echo 🌐 Repositório: https://github.com/aschinfraestructuras/sistema-gestion-calidad
echo.
echo 📋 Próximos passos:
echo    1. Verificar o repositório no GitHub
echo    2. Configurar deploy no Vercel
echo    3. Testar o sistema online
echo.

:END
echo.
echo ====================================================
echo  Fim da execução
echo ====================================================
pause
