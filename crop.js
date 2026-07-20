const sharp = require('sharp');
const fs = require('fs');

async function processIcon() {
  try {
    // Trim transparent pixels, then resize to fit 256x256 using cover to fill the square completely
    await sharp('public/images/logo1.png')
      .trim()
      .resize(256, 256, { 
        fit: 'cover', 
        background: { r: 0, g: 0, b: 0, alpha: 0 } 
      })
      .toFile('app/icon.png');
      
    console.log('Successfully created app/icon.png');
  } catch (err) {
    console.error('Error creating icon:', err);
  }
}

processIcon();
