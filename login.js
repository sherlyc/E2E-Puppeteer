const puppeteer = require('puppeteer');
const faker = require('faker');


(async () => {
  const user = {
    email: faker.internet.email(),
    password: 'test'
  }
  const browser = await puppeteer.launch({ 
    headless: false,
    slowMo: 200
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1024, height: 768});
  await page.goto('https://beta.stuff.co.nz');
  await page.goto('https://www.stuff.co.nz/about-stuff/100909861/privacy-policy');
  await page.waitForSelector(".sics-component__header__profile--login");
  console.log('login link appears');
  await page.click(".sics-component__header__profile--login");
  let pages = await browser.pages();

  //await pages[2].focus('#email-field');
  await pages[2].type('#email-field', user.email);
  await pages[2].type('#password-field', user.password)
  await pages[2].click('#login-button'); 
  await browser.close();
  console.log('done');
})();