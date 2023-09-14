const browserSetup = require('./browserSetup.js');

async function pageRender(url){
    const browser = await browserSetup.browserSetup(url);
    const page = browser[0];
    var output = await page.content();
    
    //call browserclose function when done with, browser[1] is the browser object in browserSetup
    browserSetup.browserClose(browser[1]);

    return output;
}


(async()=>{
    console.log(await pageRender("https://jobs.northernhealth.ca/JobSearch/s-/0-0-0-0-0-false-0"))
})();