
const { driver, By2, windowsAppDriverCapabilities }  = require('selenium-appium');
// const{frameAppId} = require("../setup");
const {until} = require("selenium-webdriver");
const fs = require('fs');
const fsPromises = fs.promises;



const textId = '//Text[@Name="Accounts"]';
const approveBtnId = '//Text[@Name="APPROVE"]';
const declineBtnId = '//Text[@Name="DECLINE"]';
// Tx signing vars
const acceptBtnId = '//Text[@Name="REJECT"]';

//const rejectBtnId = '//Text[@Name="ACCEPT"]';
//const decline2btn = '//Text[@Name="DECLINE"]';
const signBtnId = '//Text[@Name="SIGN"]';
//const cancelBtnId = '';
//const proceedBtnId = '';


class FrameWallet {

    constructor(framePath) {
        this.frameAppId = framePath || 'C:\\Users\\test\\AppData\\Local\\Programs\\frame\\frame.exe'

        this.capabilities = windowsAppDriverCapabilities(this.frameAppId);
        this.uniqPath = new Date().toISOString().slice(0, 10);;

        
}

async initialize() {
    this.engine = await driver.startWithCapabilities({
        browserName: '',
        platformName: 'Windows',
        deviceName: 'WindowsPC',
        app: this.frameAppId
    });
}

// destructor() {
//     driverDisconnect();    
     
// }

driverDisconnect() {
    driver.quit();
}






/**
 * Screenshot
 */
 async takeScreenshot() {
    return new Promise(async(accept)=>{
        await driver.takeScreenshot().then(async (image, err) => {
                //console.log('erro?',err);
                //console.log('img',image.toString('base64'));
                let ff = Buffer.from(image,'base64')
                let savePath = fs.realpathSync(__dirname+"/../Screenshots");
                let filename=`${savePath}/${uniqPath}.png`;
    
                // console.log('testPath',testPath);
                await fsPromises.writeFile(filename, ff, 'binary');
                accept(filename);
            }
        )
    })
};

/**
 * 
 */
async awaitForAcceptButton() {
    return new Promise(async(accept,reject)=>{
        await driver.wait(until.elementLocated(By2.nativeXpath(acceptBtnId))).catch(reject);
        return accept()
    })
}



// describe('TX signing', () => {
//     test('Request APPROVED', async () => {
//         await driver.wait(until.elementLocated(By2.nativeXpath(acceptBtnId))).click();
//         await takeScreenshot();
//         await driver.sleep(2000);
//         await driver.wait(until.elementLocated(By2.nativeXpath(signBtnId))).click();
//         await driver.sleep(10000);
//         await takeScreenshot();
        
//     })
// })



}

module.exports = FrameWallet;