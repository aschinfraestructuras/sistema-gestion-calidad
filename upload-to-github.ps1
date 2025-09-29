# Script PowerShell para subir o projeto para GitHub
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Subindo Sistema de Gestión de Calidad para GitHub" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não encontrado. Por favor, instale o Git." -ForegroundColor Red
    Write-Host "   Download: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Inicializar repositório se necessário
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositório Git..." -ForegroundColor Blue
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao inicializar repositório Git" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Repositório inicializado" -ForegroundColor Green
} else {
    Write-Host "✅ Repositório Git já existe" -ForegroundColor Green
}

Write-Host ""

# Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos ao Git..." -ForegroundColor Blue
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao adicionar arquivos" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Arquivos adicionados" -ForegroundColor Green

Write-Host ""

# Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Blue
$commitMessage = @"
Sistema de Gestión de Calidad ASCH-OHLA - Versión Profesional Completa

- Visualizador de documentos profissional como Vercel
- HTMLs dinâmicos editáveis com toolbar completa
- Sistema de impressão otimizado
- Scroll correto dentro dos documentos
- Layout moderno com gradientes e animações
- 21 capítulos com subcapítulos
- Upload integrado para Supabase
- Sistema de notificações
- Design responsivo e profissional
"@

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer commit" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Commit realizado" -ForegroundColor Green

Write-Host ""

# Configurar branch principal
Write-Host "🌿 Configurando branch principal..." -ForegroundColor Blue
git branch -M main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao configurar branch" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Branch configurada" -ForegroundColor Green

Write-Host ""

# Adicionar remote se não existir
Write-Host "🔗 Configurando repositório remoto..." -ForegroundColor Blue
$remotes = git remote -v
if ($remotes -notmatch "origin") {
    git remote add origin https://github.com/aschinfraestructuras/sistema-gestion-calidad.git
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao adicionar remote" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Remote adicionado" -ForegroundColor Green
} else {
    Write-Host "✅ Remote já configurado" -ForegroundColor Green
}

Write-Host ""

# Fazer push
Write-Host "🚀 Subindo para GitHub..." -ForegroundColor Blue
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "   1. Verificar se tem acesso ao repositório" -ForegroundColor Yellow
    Write-Host "   2. Fazer login no Git: git config --global user.name 'Seu Nome'" -ForegroundColor Yellow
    Write-Host "   3. Configurar email: git config --global user.email 'seu@email.com'" -ForegroundColor Yellow
    Write-Host "   4. Usar token de acesso pessoal se necessário" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ SUCESSO! Projeto subido para GitHub" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Repositório: https://github.com/aschinfraestructuras/sistema-gestion-calidad" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Verificar o repositório no GitHub" -ForegroundColor White
Write-Host "   2. Configurar deploy no Vercel" -ForegroundColor White
Write-Host "   3. Testar o sistema online" -ForegroundColor White
Write-Host ""

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Fim da execução" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
