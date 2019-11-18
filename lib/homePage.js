let Page = require('./basePage');
const homePage = require('../pageObjects/home-page');
const {
    Builder,
    By,
    until
} = require('selenium-webdriver');
var commons = require('../utils/commons');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

Page.prototype.loginToApplication = async function () {
    var self = this;
    var frame1 = await this.driver.findElement(By.xpath('//iframe[@class="SignIn"]'));
    await self.driver.switchTo().frame(frame1);
    await this.driver.findElement(By.xpath(homePage.emailInputSelectorXpath)).sendKeys("jagadish993@outlook.com")
    await this.waitForElementEnabled();
    await this.driver.findElement(By.xpath(homePage.nextButtonXpath)).click();
    await this.waitForElementEnabled();
    await this.driver.findElement(By.name(homePage.passwordName)).sendKeys("Out@2019");
    await this.waitForElementEnabled();
    await this.driver.findElement(By.xpath(homePage.signInBtnXpath)).click();
    await this.waitForElementEnabled();
}

Page.prototype.gotoDocuments = async function () {
    await this.driver.findElement(By.xpath(homePage.documentsXpath)).click();
    await this.waitForElementEnabled();
}

Page.prototype.uploadFile = async function () {
    var self = this;
    await this.driver.findElement(By.name(homePage.uploadButtonName)).click();
    await this.waitForElementEnabled();
    await this.driver.findElement(By.name(homePage.filesName)).click();

}



Page.prototype.verifyMetaData = async function () {
    var self = this;
    await this.driver.findElement(By.xpath(homePage.fileIconXpath)).click();
    await this.waitForElementEnabled();
    await this.driver.findElement(By.xpath(homePage.infoIconXpath)).click();
    await this.waitForElementEnabled();
    var type = await this.driver.findElement(By.xpath(homePage.docTypeXpath)).getText();
    console.log("doc type ==============" + type);
    expect(type).to.equal('Text Document');
}

Page.prototype.openFile = async function () {
    await this.driver.findElement(By.xpath(homePage.fileXpath)).click();
    await this.waitForElementEnabled();
}
Page.prototype.upDateFile = async function () {
    await this.driver.findElement(By.xpath(homePage.docInlineXpath)).click();
    await this.waitForElementEnabled();
    await this.driver.findElement(By.xpath(homePage.docInlineXpath)).sendKeys("Updating file");
}
Page.prototype.closeEditMode = async function () {
    await this.driver.findElement(By.xpath(homePage.closeFileEditModeXpath)).click();
    await this.waitForElementEnabled();
}
Page.prototype.downloadFile = async function () {
    await this.driver.findElement(By.xpath(homePage.downloadBtnXpath)).click();
    await this.waitForElementEnabled();
}
Page.prototype.deleteFileAndVerify = async function () {
    await this.driver.findElement(By.xpath(homePage.deleteBtnXpath)).click();
    await this.waitForElementEnabled();
    var message = await this.driver.findElement(By.xpath(homePage.deleteConfirmationMessageXpath)).getText();
    console.log("delete file conformation ==============" + message);
    expect(message).to.equal('Deleted 1 item from Documents');
}



module.exports = Page;