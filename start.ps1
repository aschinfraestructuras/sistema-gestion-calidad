# Script PowerShell para iniciar o projeto
Write-Host "Instalando dependencias..." -ForegroundColor Green
npm install

Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
npm run dev
