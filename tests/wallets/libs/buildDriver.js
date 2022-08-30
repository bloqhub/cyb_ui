const { Options } = require("selenium-webdriver/chrome");
const { Builder } = require("selenium-webdriver");


class BuildDriver{
  constructor(profile, extension) {
     this.chromeOptions = new Options()
      .addArguments(`user-data-dir=${profile}`)
      .addArguments(`--lang=en`)
      .addArguments(`--no-sandbox`)
      .addArguments(`disable-infobars`)
      .addArguments(`detach=false`)
      .addArguments(`--disable-features=ChromeWhatsNewUI`)
      .addArguments(`--disable-blink-features=AutomationControlled`)
      .addArguments(`--start-maximized`)
      .addArguments(`--disable-password-manager-reauthentication`)
     .addExtensions(extension);

    this.driver = new Builder()
      .forBrowser("chrome")
      .withCapabilities(this.chromeOptions)
      .build();
  }

  getDriver() {
    return this.driver;
  }
}

module.exports = BuildDriver;
