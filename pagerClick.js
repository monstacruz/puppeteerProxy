const browserSetup = require('./browserSetup.js');

var xpath = process.argvs[2];
var url = process.argvs[3];
var start = process.argvs[4];
var end = process.argvs[5];
var paging_link = process.argvs[6];
var paging_link = process.argvs[7];
var debug = process.argvs[8];

async function pagerClick(url, selector, pages, timeout = 1){
    const browser = await browserSetup.browserSetup(url);
    const page = browser[0];
    var output = await page.content();

    for(i=0; i<pages-1; i++){

        //we have to evaluate the button every iteration because sometimes the element we want to 
        //click might change in the structure of the DOM
        //Selectors with the contains text or id is best because of this
        button = await page.$x(selector);
        await button[0].click();
        //still trying to figure out a better way to wait for the content to load, 
        //so far waituntil does not trigger for both domcontentloaded as well as networkidle0
        await new Promise(r => setTimeout(r, 2000));
        var output = output + await page.content();
    }

    //call browserclose function when done with, browser[1] is the browser object in browserSetup
    browserSetup.browserClose(browser[1]);

    return output;
}


var url = "https://jobs.northernhealth.ca/JobSearch/s-/0-0-0-0-0-false-0";
var selector = "//a[contains(., 'Next')]"
var selector2 = "//*[@id='pagListTop']/span[1]/a[13]"
var timeout = 3;
var pages = 3;

(async()=>{
    console.log(await pagerClick(url, selector, pages, timeout));
})();