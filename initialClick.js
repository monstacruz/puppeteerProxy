const browserSetup = require('./browserSetup.js');

async function initialClick(url, selector, timeout){
    const browser = await browserSetup.browserSetup(url);
    const page = browser[0]
    button = await page.$x(selector);
    await button[0].click();
    await new Promise(r => setTimeout(r, timeout));
    var output = await page.content();

    //call browserclose function when done with, browser[1] is the browser object in browserSetup
    await browserSetup.browserClose(browser[1]);

    return output;
}

//var url = "https://jobs.northernhealth.ca/JobSearch/s-/0-0-0-0-0-false-0";
//console.log("helo");
var url = process.argv[2];
var selector = process.argv[3];
//var selector = "//a[contains(., 'Next')]"
//var selector2 = "//*[@id='pagListTop']/span[1]/a[13]"

(async()=>{
     console.log(await initialClick(url, selector, timeout));
 })();