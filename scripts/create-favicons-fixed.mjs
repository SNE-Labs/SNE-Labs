// Script para criar favicons a partir do SVG
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, '../public/favicon.svg');
const publicDir = path.join(__dirname, '../public');

// Cores do design system SNE
const bgColor = { r: 11, g: 11, b: 11, alpha: 1 }; // #0B0B0B

async function createFavicon(size, outputName) {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    const outputPath = path.join(publicDir, outputName);
    
    await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: bgColor
      })
      .png()
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`✅ ${outputName} (${size}x${size}px) - ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error(`❌ Erro ao criar ${outputName}:`, error.message);
  }
}

async function createIco() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    const icoPath = path.join(publicDir, 'favicon.ico');
    
    // Criar PNG de 32x32 como ICO (a maioria dos navegadores aceita PNG como ICO)
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: bgColor
      })
      .png()
      .toFile(icoPath);
    
    const stats = fs.statSync(icoPath);
    console.log(`✅ favicon.ico (32x32px) - ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Erro ao criar favicon.ico:', error.message);
  }
}

console.log('🎨 Criando favicons a partir de favicon.svg...\n');

// Verificar se o SVG existe
if (!fs.existsSync(svgPath)) {
  console.error('❌ favicon.svg não encontrado!');
  process.exit(1);
}

// Criar diferentes tamanhos
await createFavicon(16, 'favicon-16x16.png');
await createFavicon(32, 'favicon-32x32.png');
await createFavicon(96, 'favicon-96x96.png');
await createFavicon(180, 'apple-touch-icon.png');
await createFavicon(192, 'web-app-manifest-192x192.png');
await createFavicon(512, 'web-app-manifest-512x512.png');

// Criar favicon.ico
console.log('\n📦 Criando favicon.ico...');
await createIco();

console.log('\n✨ Todos os favicons criados com sucesso!');

