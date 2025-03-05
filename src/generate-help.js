const fs = require('fs');
const path = require('path');
const asciidoctor = require('@asciidoctor/core')();

const inputDir = path.join(__dirname, '../help-content/modules/ROOT/pages');
const imagesDir = path.join(__dirname, '../help-content/modules/ROOT/images');
const outputFile = path.join(__dirname, 'help-content.js');
const publicImagesDir = path.join(__dirname, '../public/images');
const logFile = path.join(__dirname, 'generate-help.log');

// Function to log messages to file and console
const log = (message) => {
  console.log(message);
  fs.appendFileSync(logFile, `${message}\n`);
};

// Clear log file at start
fs.writeFileSync(logFile, '');

log('Starting help content generation...');

// Ensure public/images directory exists
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
  log('Created public/images directory');
}

// Copy images (still needed for non-excluded images)
fs.readdirSync(imagesDir).forEach(file => {
  if (file.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
    fs.copyFileSync(
      path.join(imagesDir, file),
      path.join(publicImagesDir, file)
    );
    log(`Copied image: ${file}`);
  }
});

const helpContent = {};

// Process regular help files
fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.adoc') && file !== 'redirects-deep-dive.adoc') {
    const content = fs.readFileSync(path.join(inputDir, file), 'utf8');
    const html = asciidoctor.convert(content, {
      standalone: false,
      attributes: { 
        'imagesdir': '/images',
        'help': '' // Define help attribute to exclude ifndef::help[] content
      },
    });
    const key = file.replace('.adoc', '');
    helpContent[key] = html;
    log(`Processed regular file: ${file}`);
  }
});

// Process deep dive file
const deepDiveFile = path.join(inputDir, 'redirects-deep-dive.adoc');
if (fs.existsSync(deepDiveFile)) {
  const content = fs.readFileSync(deepDiveFile, 'utf8');
  log('Deep Dive Content:\n' + content);
  const doc = asciidoctor.load(content, {
    attributes: { 
      'imagesdir': '/images',
      'help': '' // Define help attribute here too
    },
  });
  const sections = doc.getSections();
  log(`Found Sections: ${sections.length}`);
  helpContent['redirects-deep-dive'] = {};
  sections.forEach(section => {
    const title = section.getTitle().toLowerCase().replace(/\s+/g, '-');
    const html = section.convert();
    log(`Section: ${title}, HTML: ${html}`);
    helpContent['redirects-deep-dive'][title] = html;
  });
} else {
  log('Deep dive file not found!');
}

const output = `export const helpContent = ${JSON.stringify(helpContent, null, 2)};`;
fs.writeFileSync(outputFile, output);

log('Help content and images generated!');