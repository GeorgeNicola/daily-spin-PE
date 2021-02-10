const fs = require('fs');
const path = require('path');
const campaignNumber = fs.readdirSync('./src/Campaigns/');
const imagesFolder = `./src/Campaigns/${campaignNumber[0]}/images/`;
var content = fs.readFileSync(`./src/Campaigns/${campaignNumber[0]}/Scripts/b/configPromo.js`, "utf8");
const imagesArray = eval(content+' module.exports = prizesArray;');
const langsInComToCheck = ['en','es','ru','de','fr','pt'];



function checkImages(fPath, fName){
    let folderPath = fPath + fName;
    fs.readdir(folderPath, (err, files)=>{
        let success = true;
        imagesArray.forEach(image =>{
            if(!files.includes(image+'.jpg')){
                console.log('\x1b[35m%s\x1b[0m', `--- warning  "${folderPath}/${image}.jpg" not found`);
                success = false
            }
        });
        if(fName === 'com'){
            langsInComToCheck.forEach(lang =>{
                if(!files.includes(lang+'-scratch.jpg')){
                    console.log('\x1b[35m%s\x1b[0m', `--- warning  "${folderPath}/${lang}-scratch.jpg" not found`);
                    success = false
                }
            });
        }else{
            if(!files.includes('scratch.jpg')){
                console.log('\x1b[35m%s\x1b[0m', `--- warning  "${folderPath}/scratch.jpg" not found`);
                success = false
            }
        }
        if(success){
            console.log('\x1b[32m%s\x1b[0m',`-- ${folderPath} -V`)
        }
    });
}

function checkBG(images) {
    if(images.includes('background.jpg')){
        console.log('\x1b[32m%s\x1b[0m', '-- background.jpg -V')
    }else{
        console.log('\x1b[35m%s\x1b[0m', '--- background.jpg is missing from the images folder')
    }
}

fs.readdir(imagesFolder, (err,folders) => {
    checkBG(folders);
    folders.forEach(folder => {
        let ext = path.extname(folder);
        if(ext === ''){
            checkImages(imagesFolder,folder);
        }
    });
});