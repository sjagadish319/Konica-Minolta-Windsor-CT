const {
    describe,
    it,
    after,
    before
} = require('mocha');
const Page = require('../lib/homePage');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const tData = require('../testData/testData.json');
process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe('One Drive Application Automation', async function () {
            this.timeout(50000);
            let driver, page;

            before(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(tData.url);
            });

            after(async () => {
                await page.quit();
            });

            it('Login into One Drive Application', async () => {
                await page.loginToApplication();
            })
            it('Navigate to Documents Page', async () => {
                await page.gotoDocuments();
            });
            it('Verify the Meta Data', async () => {
                await page.verifyMetaData();
            })
            it('Select and Open file', async () => {
                await page.openFile();
            });
            it('Update and close the edit mode', async () => {
                // await page.upDateFile();
                await page.closeEditMode();
            })
            it('Download the file', async () => {
                await page.downloadFile();
            })
            it('Delete and verify the message', async () => {
                await page.deleteFileAndVerify();
            });


        });
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {

    }
})();