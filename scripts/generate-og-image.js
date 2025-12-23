// Script para gerar og-image.png
// Requer: npm install canvas (opcional) ou use uma ferramenta externa
// Alternativa: Use um serviço online ou ferramenta de design

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Este script cria um SVG que pode ser convertido para PNG
// Para gerar PNG real, você precisará de uma biblioteca como 'canvas' ou usar uma ferramenta online

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0B0B0B"/>
  
  <!-- Gradient overlay -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6A00;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#00C48C;stop-opacity:0.1" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF6A00" />
      <stop offset="100%" style="stop-color:#FFC857" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#grad)"/>
  
  <!-- Grid pattern (subtle) -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B1B1F" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Main Title -->
  <text x="600" y="250" font-family="Inter, sans-serif" font-size="72" font-weight="700" fill="url(#textGrad)" text-anchor="middle" letter-spacing="-0.02em">
    SNE Vault
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="320" font-family="Inter, sans-serif" font-size="32" font-weight="400" fill="#F7F7F8" text-anchor="middle" opacity="0.9">
    Sistema de Nós de Execução
  </text>
  
  <!-- Description -->
  <text x="600" y="380" font-family="Inter, sans-serif" font-size="24" font-weight="400" fill="#A6A6A6" text-anchor="middle" opacity="0.8">
    Infraestrutura verificável para edge computing
  </text>
  
  <!-- Technical badges -->
  <g transform="translate(600, 480)">
    <rect x="-200" y="-20" width="120" height="40" rx="8" fill="#1B1B1F" stroke="#FF6A00" stroke-width="2" opacity="0.8"/>
    <text x="-140" y="5" font-family="JetBrains Mono, monospace" font-size="14" fill="#FF6A00" text-anchor="middle">Blockchain</text>
    
    <rect x="-40" y="-20" width="120" height="40" rx="8" fill="#1B1B1F" stroke="#FF6A00" stroke-width="2" opacity="0.8"/>
    <text x="20" y="5" font-family="JetBrains Mono, monospace" font-size="14" fill="#FF6A00" text-anchor="middle">AES-256</text>
    
    <rect x="120" y="-20" width="120" height="40" rx="8" fill="#1B1B1F" stroke="#FF6A00" stroke-width="2" opacity="0.8"/>
    <text x="180" y="5" font-family="JetBrains Mono, monospace" font-size="14" fill="#FF6A00" text-anchor="middle">Scroll L2</text>
  </g>
  
  <!-- Decorative elements -->
  <circle cx="150" cy="150" r="3" fill="#FF6A00" opacity="0.6"/>
  <circle cx="1050" cy="480" r="3" fill="#00C48C" opacity="0.6"/>
  <circle cx="200" cy="500" r="2" fill="#FFC857" opacity="0.5"/>
  <circle cx="1000" cy="130" r="2" fill="#FF6A00" opacity="0.4"/>
  
  <!-- Bottom text -->
  <text x="600" y="600" font-family="Inter, sans-serif" font-size="18" font-weight="400" fill="#A6A6A6" text-anchor="middle" opacity="0.6">
    snelabs.space
  </text>
</svg>`;

const outputPath = path.join(__dirname, '../public/og-image.svg');
fs.writeFileSync(outputPath, svgContent);
console.log('✅ SVG criado em public/og-image.svg');
console.log('📝 Para converter para PNG, use uma ferramenta online ou:');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - ou instale imagemagick: magick og-image.svg og-image.png');

