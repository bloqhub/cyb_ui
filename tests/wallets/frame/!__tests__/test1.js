const { driver } = require("selenium-appium");
const walletFrameModule = require("../libs/wallet.frame");
let walletFrame = new walletFrameModule("3876");

(async ()=>{


    await walletFrame.initialize();
    walletFrame.awaitForAcceptButton().then((el)=>{
console.log('element deyeced');
    });

})();