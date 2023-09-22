const fs = require('fs');

function writeOutput(output){
    fs.writeFile('./renderedPage.txt', output, err=>{
        if(err){
            console.log(err);
        }
    })
}

module.exports = {writeOutput};
