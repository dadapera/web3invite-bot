// Libraries for Ethereum wallet creation and interacting with webpages
const ethers = require('ethers');
const puppeteer = require('puppeteer');

var url = 'https://zns.is/free/0x3B63BbF52aa94016B61eE8d6809253F915d61411';

async function createAndInteractWithWallet() {
  // Create an Ethereum wallet
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const address = wallet.address;

  // Connect to a website using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Extract numbers from the CAPTCHA image
  const captchaImageUrl = await page.$eval('img[alt="Captcha"].el-input-group__prepend', (img) => img.src);
  const captchaValue = await extractNumbersFromCaptcha(captchaImageUrl);

  // Enter the extracted CAPTCHA value
  const captchaInput = await page.$('#el-id-3324-18');
  await captchaInput.type(captchaValue);

  // Click the "Join Event" button
  await page.click('button.el-button.el-button--primary.is-round');
  await page.waitForNavigation();

  // Close the browser
  await browser.close();

  // Output wallet information
  console.log('Private Key:', privateKey);
  console.log('Address:', address);
}

// Execute the script
createAndInteractWithWallet()
  .then(() => {
    console.log('Script execution completed successfully.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
