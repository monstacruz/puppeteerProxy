const browserSetup = require('./browserSetup.js');

var url = process.argvs[2];
var encoded_url = process.argvs[3];
var  harvester_url = process.argvs[4];
var encoded_harvester_url = process.argvs[5];
var wait_time = process.argvs[6];
var json = process.argvs[7];
var debug = process.argvs[8];


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