const browserSetup = require('./browserSetup.js');

var xpath = process.argv[2];
var url = process.argv[3];
var start = process.argv[4];
var end = process.argv[5];
var paging_link = process.argv[6];
var paging_link = process.argv[7];
var debug = process.argv[8];
const pages = end - start;
var timeout = 1000

async function pagerClick(url, selector, start, end, timeout = 1000){
    const browser = await browserSetup.browserSetup(url);
    const page = browser[0];
    console.log(start + ", " + end);
    const lastPage = parseInt(end) + 1
    for(i=1; i < lastPage; i++){

        //evaluated so that we can actually parse data between specific pages and 
        //not just the difference between start and end
        //this will now parse data from start page to end page whereas before in the old proxy, the amount of pages would be determined by the difference between the start and end values
        if (i >= start){
            var output = output + await page.content();
        }

        //we have to evaluate the button every iteration because sometimes the element we want to 
        //click might change in the structure of the DOM
        //Selectors with the contains text or id is best because of this
        button = await page.$x(selector);
        await button[0].click();

        //still trying to figure out a better way to wait for the content to load, 
        //so far waituntil does not trigger for both domcontentloaded as well as networkidle0
        await new Promise(r => setTimeout(r, timeout));
    }

    //call browserclose function when done with, browser[1] is the browser object in browserSetup
    browserSetup.browserClose(browser[1]);

    return output;
}


// var url = "https://jobs.northernhealth.ca/JobSearch/s-/0-0-0-0-0-false-0";
// var selector = "//a[contains(., 'Next')]"
// var selector2 = "//*[@id='pagListTop']/span[1]/a[13]"
// var timeout = 3;
// var pages = 3;

(async()=>{
    console.log(await pagerClick(url, xpath, start, end, timeout));
})();