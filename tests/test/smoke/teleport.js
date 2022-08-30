const assert = require('assert')
const driverModule = require("../../wallets/libs/buildDriver");

const {profilePath, appPath} = require('../../configs/paths');
const {robot, teleport} = require('../../configs/urls');

const {txUrlId, fuckBtnId, continueBtnId } = require('../../wallets/keplr/pages/robot');

const {applyBtnId} = require('../../wallets/keplr/pages/keplr');
const { clickOnElement, ensureOneWindowsOpen, ensureElPresentDOM, closeWindow, checkWindowHandle,
  navigateToUrl, switchToNewWindow, switchToOriginalWindow2, setPassword, setTokenAmount,
  switchToOriginalWindow, chooseBuyToken, chooseSellToken, clearTokenAmount, chooseBtnClick
} = require('../../wallets/libs/webdriverRelated');

const {takeScreenshot} = require('../../wallets/libs/fsRelated');
let driver = new driverModule(profilePath, appPath);
let defaultWindow;

describe('Positive. Swap tokens inside "Cyber-testnet"  ', () => {
  before(async () => {
    defaultWindow = await checkWindowHandle(driver.getDriver());
    await navigateToUrl(driver.getDriver(), robot);
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await setPassword(driver.getDriver());
    await switchToOriginalWindow(driver.getDriver(), defaultWindow, []);
    await navigateToUrl(driver.getDriver(), teleport);
  });

  /**
   *    1 2 3
   *  1   x x
   *  2 x   x
   *  3 x x
   */

  it('Swaps BOOT to H. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 0);
    await chooseBuyToken(driver.getDriver(), 1);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps BOOT to A. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 0);
    await chooseBuyToken(driver.getDriver(), 2);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps H to BOOT. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 1);
    await chooseBuyToken(driver.getDriver(), 0);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps H to A. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 1);
    await chooseBuyToken(driver.getDriver(), 2);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps A to BOOT. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 2);
    await chooseBuyToken(driver.getDriver(), 0);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps A to H. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 2);
    await chooseBuyToken(driver.getDriver(), 1);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps BOOT to BOOT. EXPECTING ERROR', async () => {
    await chooseSellToken(driver.getDriver(), 0);
    await chooseBuyToken(driver.getDriver(), 0);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await clickOnElement(driver.getDriver(), continueBtnId);
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await takeScreenshot(driver.getDriver());
    await assert.equal(el, true);
  });

  it('Swaps H to H. EXPECTING ERROR', async () => {
    await chooseSellToken(driver.getDriver(), 1);
    await chooseBuyToken(driver.getDriver(), 1);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await clickOnElement(driver.getDriver(), continueBtnId);
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await takeScreenshot(driver.getDriver());
    await assert.equal(el, true);
  });

  it('Swaps A to A. EXPECTING ERROR', async () => {
    await chooseSellToken(driver.getDriver(), 2);
    await chooseBuyToken(driver.getDriver(), 2);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await takeScreenshot(driver.getDriver());
    await assert.equal(el, true);
  });

  after(async () => {
    await closeWindow(driver.getDriver());
  });
})