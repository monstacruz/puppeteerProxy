const puppeteer = require('puppeteer');

async function browserSetup(url) {
    const browser = await puppeteer.launch({"headless":false});
    const page = await browser.newPage();
    await page.goto(url, {'waitUntil' : 'networkidle0'})

    // returned page and browser so that browser can be closed in the browserClose function
    return [page, browser];
}

async function browserClose(browser){
    await browser.close();
}
module.exports = {browserSetup, browserClose};