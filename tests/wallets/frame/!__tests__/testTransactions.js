jest.setTimeout(60000);


import { driver, By2, windowsAppDriverCapabilities } from 'selenium-appium';
import {frameAppId} from "../setup";
import {until} from "selenium-webdriver";
const fs = require('fs');
const fsPromises = fs.promises;

const capabilities = windowsAppDriverCapabilities(frameAppId);
//const walletSeed = 'close dress wing oxygen monster chair faith carbon cause smile ghost remember';
//const walletPasswd = '{Q[]=Dm-t7/0';
const textId = '//Text[@Name="Accounts"]';

let uniqPath = new Date().toISOString().slice(0, 10);;
//Wallet connection vars
const approveBtnId = '//Text[@Name="APPROVE"]';
const declineBtnId = '//Text[@Name="DECLINE"]';

//Locked wallet vars
//const foldBtn = '';

// Tx signing vars
const acceptBtnId = '//Text[@Name="REJECT"]';
//const rejectBtnId = '//Text[@Name="ACCEPT"]';
//const decline2btn = '//Text[@Name="DECLINE"]';
const signBtnId = '//Text[@Name="SIGN"]';
//const cancelBtnId = '';
//const proceedBtnId = '';


jest.setTimeout(60000);

let takeScreenshot = async () => {
    await driver.takeScreenshot().then(
        async function(image, err) {
            //console.log('erro?',err);
            //console.log('img',image.toString('base64'));
            let ff = Buffer.from(image,'base64')
            let savePath = fs.realpathSync(__dirname+"/../Screenshots");
            let filename=`${savePath}/${uniqPath}.png`;

            // console.log('testPath',testPath);
            await fsPromises.writeFile(filename, ff, 'binary');
        }
    )
};


// beforeAll(() => {
//     return driver.startWithCapabilities(capabilities);
// });

// afterAll(() => {
//     return driver.quit();
// });

describe.skip('Launching frame App', () => {
    test('Main Window opens', async () => {
        await driver.wait(until.elementLocated(By2.nativeXpath(textId)));
        await takeScreenshot();
    })
})

describe.skip('Wallet connection request', () => {
    test.skip('Request DECLINED', async () => {
        await driver.wait(until.elementLocated(By2.nativeXpath(declineBtnId)));
        await takeScreenshot();
        await By2.nativeXpath(declineBtnId).click()
    })
    test('Request APPROVED', async () => {
        await driver.wait(until.elementLocated(By2.nativeXpath(approveBtnId)));
        await By2.nativeXpath(approveBtnId).click()
    })
})

describe('TX signing', () => {
    test.skip('Request DECLINED', async () => {
        await driver.wait(until.elementLocated(By2.nativeXpath(decline2BtnId)));
        await By2.nativeXpath(decline2BtnId).click()
    })
    test('Request APPROVED', async () => {
        await driver.wait(until.elementLocated(By2.nativeXpath(acceptBtnId))).click();
        await takeScreenshot();
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(By2.nativeXpath(signBtnId))).click();
        await driver.sleep(10000);
        await takeScreenshot();
        
    })
})

