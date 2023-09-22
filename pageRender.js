const browserSetup = require('./browserSetup.js');
const output = require('./output.js').writeOutput;

var url = process.argv[2];
var encoded_url = process.argv[3];
var  harvester_url = process.argv[4];
var encoded_harvester_url = process.argv[5];
var wait_time = process.argv[6];
var json = process.argv[7];
var debug = process.argv[8];


async function pageRender(url){
    const browser = await browserSetup.browserSetup(url);
    const page = browser[0];
    var output = await page.content();
    
    //call browserclose function when done with, browser[1] is the browser object in browserSetup
    browserSetup.browserClose(browser[1]);

    return output;
}


(async()=>{
    output(await pageRender(url))
})();