const fs = require('fs');
const path = require('path');
const asciidoctor = require('@asciidoctor/core')();

const inputDir = path.join(__dirname, '../help-content/modules/ROOT/pages');
const imagesDir = path.join(__dirname, '../help-content/modules/ROOT/images');
const outputFile = path.join(__dirname, 'help-content.js');
const publicImagesDir = path.join(__dirname, '../public/images');

// Ensure public/images directory exists
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Copy images from help-content to public/images
fs.readdirSync(imagesDir).forEach(file => {
  if (file.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
    fs.copyFileSync(
      path.join(imagesDir, file),
      path.join(publicImagesDir, file)
    );
  }
});

const helpContent = {};

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.adoc')) {
    const content = fs.readFileSync(path.join(inputDir, file), 'utf8');
    const html = asciidoctor.convert(content, {
      standalone: false,
      attributes: { 'imagesdir': '/images' }, // Point to /images in public/
    });
    const key = file.replace('.adoc', '');
    helpContent[key] = html;
  }
});

const output = `export const helpContent = ${JSON.stringify(helpContent, null, 2)};`;
fs.writeFileSync(outputFile, output);

console.log('Help content and images generated!');