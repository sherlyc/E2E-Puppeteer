const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
      headless: false,
      slowMo: 250 // slow down by 20ms 
    });
  const page = await browser.newPage();
  page.setViewport({ width: 1024, height: 768});
  await page.goto('https://beta.stuff.co.nz');
  await page.goto('https://www.stuff.co.nz/about-stuff/100909861/privacy-policy');
  await page.goto('https://www.stuff.co.nz/world/americas/104201115/robot-submarine-found-the-holy-grail-of-shipwrecks');
  console.log('Scrolling through page');
  await autoScroll(page);
  await page.screenshot({path: 'endofpage.png'});
  await browser.close();
})();

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            try {
                const maxScroll = Number.MAX_SAFE_INTEGER;
                let lastScroll = 0;
                const interval = setInterval(() => {
                    window.scrollBy(0, 100);
                    const scrollTop = document.documentElement.scrollTop;
                    if (scrollTop === maxScroll || scrollTop === lastScroll) {
                        clearInterval(interval);
                        resolve();
                    } else {
                      lastScroll = scrollTop;
                    }
                }, 100);
            } catch (err) {
                console.log(err);
                reject(err.toString());
            }
        });
    })
}