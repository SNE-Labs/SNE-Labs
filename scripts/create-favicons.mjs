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
      .toFile(outputPath);
    
    console.log(`✅ Criado: ${outputName} (${size}x${size}px)`);
  } catch (error) {
    console.error(`❌ Erro ao criar ${outputName}:`, error.message);
  }
}

console.log('🎨 Criando favicons...\n');

// Criar diferentes tamanhos
await createFavicon(16, 'favicon-16x16.png');
await createFavicon(32, 'favicon-32x32.png');
await createFavicon(96, 'favicon-96x96.png');
await createFavicon(180, 'apple-touch-icon.png');
await createFavicon(192, 'web-app-manifest-192x192.png');
await createFavicon(512, 'web-app-manifest-512x512.png');

// Criar favicon.ico (multi-size ICO)
console.log('\n📦 Criando favicon.ico...');
try {
  const svgBuffer = fs.readFileSync(svgPath);
  const ico16 = await sharp(svgBuffer).resize(16, 16, { fit: 'contain', background: bgColor }).png().toBuffer();
  const ico32 = await sharp(svgBuffer).resize(32, 32, { fit: 'contain', background: bgColor }).png().toBuffer();
  
  // Para ICO real, precisaríamos de uma biblioteca específica, mas PNG funciona na maioria dos casos
  // Vamos criar um PNG de 32x32 como favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32, { fit: 'contain', background: bgColor })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  
  console.log('✅ Criado: favicon.ico (32x32px)\n');
} catch (error) {
  console.error('❌ Erro ao criar favicon.ico:', error.message);
}

console.log('✨ Todos os favicons criados com sucesso!');

