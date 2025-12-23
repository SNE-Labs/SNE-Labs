// Script para converter og-image.svg para og-image.png usando sharp
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, '../public/og-image.svg');
const pngPath = path.join(__dirname, '../public/og-image.png');

try {
  // Lê o SVG
  const svgBuffer = fs.readFileSync(svgPath);
  
  // Converte para PNG 1200x630
  await sharp(svgBuffer)
    .resize(1200, 630, {
      fit: 'contain',
      background: { r: 11, g: 11, b: 11, alpha: 1 } // #0B0B0B
    })
    .png()
    .toFile(pngPath);
  
  console.log('✅ PNG criado com sucesso em public/og-image.png');
  console.log('📐 Dimensões: 1200x630px');
  
  // Verifica o tamanho do arquivo
  const stats = fs.statSync(pngPath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  console.log(`📦 Tamanho: ${fileSizeKB} KB`);
  
} catch (error) {
  console.error('❌ Erro ao converter SVG para PNG:', error.message);
  process.exit(1);
}

