# Script PowerShell para instalação rápida
# Execute: .\INSTALACAO_RAPIDA.ps1

Write-Host "🔧 Otimizando configuração do npm..." -ForegroundColor Cyan

# Configurar registry e timeouts
npm config set registry https://registry.npmjs.org/
npm config set fetch-timeout 60000
npm config set fetch-retries 3
npm config set progress false

Write-Host "✅ Configuração otimizada!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Instalando dependências..." -ForegroundColor Cyan
Write-Host "   (Isso pode levar 2-3 minutos)" -ForegroundColor Yellow
Write-Host ""

# Instalar com progresso mínimo
npm install --no-progress --prefer-offline

Write-Host ""
Write-Host "✅ Instalação concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Testando build..." -ForegroundColor Cyan
npm run build

