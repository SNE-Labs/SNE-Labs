# Como converter og-image.svg para og-image.png

O arquivo `og-image.svg` foi criado em `public/og-image.svg`. Para converter para PNG (1200x630px), você tem algumas opções:

## Opção 1: Ferramenta Online (Mais Rápido)

1. Acesse: https://cloudconvert.com/svg-to-png
2. Faça upload de `public/og-image.svg`
3. Configure:
   - Width: 1200
   - Height: 630
4. Baixe o PNG e salve como `public/og-image.png`

## Opção 2: ImageMagick (Linha de Comando)

Se você tem ImageMagick instalado:

```bash
magick public/og-image.svg -resize 1200x630 public/og-image.png
```

## Opção 3: Inkscape (GUI)

1. Abra `public/og-image.svg` no Inkscape
2. File > Export PNG Image
3. Configure: Width 1200, Height 630
4. Salve como `public/og-image.png`

## Opção 4: Node.js com sharp (Programático)

```bash
npm install --save-dev sharp
```

Depois execute:
```bash
node -e "const sharp = require('sharp'); sharp('public/og-image.svg').resize(1200, 630).png().toFile('public/og-image.png');"
```

## Verificação

Após criar o PNG, verifique:
- Tamanho: 1200x630px
- Localização: `public/og-image.png`
- Tamanho do arquivo: idealmente < 200KB

