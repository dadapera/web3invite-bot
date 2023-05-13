// captchaUtils.js

const { createCanvas, loadImage } = require('canvas');
const Tesseract = require('tesseract.js');

async function extractNumbersFromCaptcha(imageUrl) {
  const image = await loadImage(imageUrl);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const worker = Tesseract.createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
  });
  await worker.setImage(canvas);
  const { data: { text } } = await worker.recognize();
  await worker.terminate();

  return text.replace(/\D/g, '');
}

module.exports = {
  extractNumbersFromCaptcha,
};
