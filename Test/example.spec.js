// @ts-check
const { test, expect, defineConfig  } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const TEST_NAME = 'Account Creation with Corporate Test';
const TEST_NAME_billing = 'Account Creation with Billing Test';
const TEST_NAME_OPPOTUNITY_CREATION = 'Opportunity Creation';
const TEST_NAME_Enterprise_Quote= 'Create Enterprise Quote and Order'; 
let nextPageUrl;
// Define the file path
const filePath = path.resolve(__dirname, 'M1-MemberUpload_3Locations (2).csv');
export default defineConfig({
  timeout: 50 * 60 * 1000,
});
test.describe.configure({ mode: 'serial' });

let testData;

// Helper function to generate dynamic data based on Date.now()
function generateDynamicData() {
  const timestamp = Date.now(); // Get current timestamp in milliseconds
  return {
    corporateAccountName: `Automated Corporate Customer ${timestamp}`,
    billingAccountName: `Automated Billing Customer ${timestamp}`,
    opportunityName: `Automated Test Opportunity ${timestamp}`,
    corporateId: `ID-${timestamp}`, // Unique ID using timestamp
    additionalDetails: `Dev Test - Automated Test Run ${timestamp}`
  };
}

// This hook runs once before all tests
test.beforeAll(() => {
  // Generate unique data based on current date-time for this test run
  testData = generateDynamicData();
});


test('Corporate Customer Account', async ({ page }) => {
  const startTime = Date.now();
  const testResult = {
    Name: TEST_NAME,
    Status: 'Passed',
    ExecutionTime: 0,
    Timestamp: new Date().toISOString(),
    ErrorMessage: '',
    AdditionalDetails: testData.additionalDetails
  };
  test.slow();
  test.setTimeout(3000000);
  try{
  await page.goto('https://test.salesforce.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('ey_czupryn@m1b2b.com.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Welcome-202411');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.getByRole('link', { name: 'Accounts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.locator('label').filter({ hasText: 'Corporate Customer AccountUse' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('*Account Name').click();
  await page.getByLabel('*Account Name').fill(testData.corporateAccountName);
  await page.getByLabel('*Paid Up Capital').click();
  await page.getByLabel('*Paid Up Capital').fill('14070');
  await page.getByRole('combobox', { name: 'ID Type' }).click();
  await page.getByRole('option', { name: 'FBRN' }).locator('span').nth(1).click();
  await page.getByLabel('*ID No').click();
  await page.getByLabel('*ID No').fill(testData.corporateId.toString());
  await page.getByRole('combobox', { name: 'Biz Type' }).click();
  await page.getByText('IT/Telecom').click();
  await page.getByLabel('Street Name 1').click();
  await page.getByLabel('Street Name 1').fill('fgfg');
  await page.getByLabel('Street Name 2').click();
  await page.getByLabel('Street Name 2').fill('gffgg');
  await page.getByLabel('Street Name 3').click();
  await page.getByLabel('Street Name 3').fill('fbfgg');
  await page.getByLabel('Address Type').click();
  await page.getByLabel('Address Type').fill('awdsdd');
  await page.getByLabel('City').click();
  await page.getByLabel('City').fill('singapore');
  await page.getByLabel('Unit No').click();
  await page.getByLabel('Unit No').fill('44');
  await page.getByLabel('Post Code').click();
  await page.getByLabel('Post Code').fill('45214');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForURL('**/view');
} catch (error) {
  // Capture the error message if test fails
  testResult.Status = 'Failed';
  testResult.ErrorMessage = error.message;
} finally {
  // Calculate execution time
  const endTime = Date.now();
  testResult.ExecutionTime = (endTime - startTime) / 1000; // Execution time in seconds

  await logTestResultInSalesforce(page, testResult);
}
});

test('create account with billing information', async ({ page }) => {
  const startTime = Date.now();
  const testResult = {
    Name: TEST_NAME_billing,
    Status: 'Passed',
    ExecutionTime: 0,
    Timestamp: new Date().toISOString(),
    ErrorMessage: '',
    AdditionalDetails: testData.additionalDetails
  };
  test.slow();
  test.setTimeout(3000000);
  try {
    
    await page.goto('https://test.salesforce.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('ey_czupryn@m1b2b.com.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Welcome-202411');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
    // Navigate to the Accounts page and create a new account
    await page.getByRole('link', { name: 'Accounts' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.locator('label').filter({ hasText: 'Corporate Billing AccountUse' }).locator('span').first().click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Fill in account information
    await page.getByLabel('*Parent Account').click();
    await page.getByLabel('Recent Accounts').getByText(testData.corporateAccountName).click();
    await page.getByLabel('Billing eMail Address').fill('test@gmail.com');
    await page.getByRole('combobox', { name: 'Bill Cycle' }).click();
    await page.getByText('M001').click();
    await page.getByLabel('*Account Name').fill(testData.billingAccountName);
    await page.getByLabel('*Bill Contact Name').fill('ffrcfc');
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // Wait for page navigation after save
    await page.waitForURL('**/view');

  } catch (error) {
    // Capture the error message if test fails
    testResult.Status = 'Failed';
    testResult.ErrorMessage = error.message;
  } finally {
    // Calculate execution time
    const endTime = Date.now();
    testResult.ExecutionTime = (endTime - startTime) / 1000; // Execution time in seconds

    await logTestResultInSalesforce(page, testResult);
  }
});


test('create opportunity', async ({ page }) => {
  const startTime = Date.now();
  const testResult = {
    Name: TEST_NAME_OPPOTUNITY_CREATION,
    Status: 'Passed',
    ExecutionTime: 0,
    Timestamp: new Date().toISOString(),
    ErrorMessage: '',
    AdditionalDetails: testData.additionalDetails
  };
  test.slow();
  test.setTimeout(3000000);
  try{
  await page.goto('https://test.salesforce.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('ey_czupryn@m1b2b.com.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Welcome-202411');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  //await page.goto('https://m1limited--dev.sandbox.lightning.force.com/lightning/n/vlocity_cmt__EnterpriseSalesApp?c__accountId=0018500000MpaHn&c__cartId=0Q085000000NxVdCAK&c__cartName=Test%20Working%20Cart&c__objType=Quote');
  await page.getByRole('link', { name: 'Opportunities' }).click();
    await page.getByRole('button', { name: 'New' }).click();
  //await page.waitForURL('/**view');
  await page.getByLabel('Amount', { exact: true }).click();
  await page.getByLabel('Amount', { exact: true }).fill('1900');
  await page.getByLabel('*Opportunity Name').click();
  await page.getByLabel('*Opportunity Name').fill(testData.opportunityName);
  await page.getByLabel('*Account Name').click();
  await page.getByLabel('Recent Accounts').getByText(testData.corporateAccountName).click();
  await page.getByLabel('*Close Date').click();
  await page.getByLabel('-10-29').getByRole('button', { name: '29' }).click();
  await page.getByRole('combobox', { name: 'Stage' }).click();
  await page.getByTitle('Prospecting').click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
await page.waitForURL('**/view');
} catch (error) {
  // Capture the error message if test fails
  testResult.Status = 'Failed';
  testResult.ErrorMessage = error.message;
} finally {
  // Calculate execution time
  const endTime = Date.now();
  testResult.ExecutionTime = (endTime - startTime) / 1000; // Execution time in seconds

  await logTestResultInSalesforce(page, testResult);
}
});

test('create Enterprise Quote and Order', async ({ page }) => {
  const startTime = Date.now();
  const testResult = {
    Name: TEST_NAME_Enterprise_Quote,
    Status: 'Passed',
    ExecutionTime: 0,
    Timestamp: new Date().toISOString(),
    ErrorMessage: '',
    AdditionalDetails: testData.additionalDetails
  };
  test.slow();
  test.setTimeout(3000000);
  try{
  await page.goto('https://test.salesforce.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('ey_czupryn@m1b2b.com.dev');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Welcome-202411');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  //await page.goto('https://m1limited--dev.sandbox.lightning.force.com/lightning/n/vlocity_cmt__EnterpriseSalesApp?c__accountId=0018500000ORzj9&c__cartId=0Q085000000NyBZCA0&c__cartName=M1_Corporate__Quote_8112024_64276086&c__ContainerName=cfB2bSampleAppCard&c__objType=Quote');
  await page.getByRole('link', { name: 'Opportunities' }).click();
  await page.getByRole('link', { name: testData.opportunityName }).click();
  //await page.getByRole('link', { name: 'Automated Test Opportunity 1732081894554' }).click();
  await page.locator('a').filter({ hasText: 'Prepare Quote' }).click();
  await page.locator('button').filter({ hasText: 'Mark as Current Stage' }).click();
  await page.getByRole('button', { name: 'Create Enterprise Quote' }).click();
  await page.getByLabel('*Price List Name').click();
  await page.getByText('B2B SGD Pricelist').click();
  await page.locator('label').filter({ hasText: 'No' }).locator('span').first().click();
  await page.getByRole('combobox', { name: 'Billing Account' }).click();
  await page.getByRole('combobox', { name: 'Billing Account' }).fill('A');
  await page.getByText(testData.billingAccountName).nth(1).click();
  //await page.getByText('Automated Billing Customer 1732081894554').nth(1).click();
  await page.getByRole('button', { name: 'Next' }).click(); 
  await page.waitForLoadState('load');
  await page.locator('c-extended-b2b-cart-summary').getByRole('button', { name: 'Add Products' }).click();
  
  await page.getByLabel('FBB Products').getByTitle('Expand Tree Branch').click();
  await page.getByRole('link', { name: 'FBB Broadband' }).click();
  await page.locator('c-b2b-guided-product-item').filter({ hasText: 'Wireless@SG Dynamic' }).getByRole('button').nth(1).click();
 
  //await page.getByRole('combobox', { name: 'Search' }).click();
 // await page.getByRole('combobox', { name: 'Search' }).fill('Wireless@SG ');
  //await page.getByText('In Products - Wireless@SG Dynamic').click();
  //await page.getByRole('button', { name: '+Add to Cart' }).click();
  

  //await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  //await page.waitForLoadState('load');  

  //await page.waitForTimeout(5000);
  //await page.getByRole('button', { name: '+Add to Cart' }).first().click();

  await page.waitForLoadState('load');  
  await page.getByRole('button', { name: 'Add to Configuration Cart' }).click();
  await page.waitForLoadState('load'); 
  await page.getByRole('combobox', { name: '*Contract Term' }).first().click();
  await page.getByText('12 Months').nth(0).click(); 
  await page.getByRole('combobox', { name: '*Speed' }).first().click();
  await page.getByText('200 Mbps').nth(0).click(); 
  await page.getByRole('combobox', { name: '*Site Type' }).first().click();
  await page.getByText('Indoor NBAP').nth(0).click(); 
  await page.getByRole('button', { name: 'Add 1 Product to Quote' }).click();
  
  await page.getByRole('tab', { name: 'Summary (1)' }).click();
  await page.getByRole('cell', { name: 'Row 1 Wireless@SG Dynamic' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Enrich Quote' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('article').getByRole('button', { name: 'Next' }).click();
  //await page.getByLabel('*Broadband Margin %').click();
  //await page.getByLabel('*Broadband Margin %').fill('50');
  //await page.getByLabel('*Overall Margin %').click();
  //await page.getByLabel('*Overall Margin %').fill('50');
  //await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('article').getByRole('button', { name: 'Next' }).click();
  //await page.locator('#modal-content-id-1').getByRole('button', { name: 'Next' }).click();
  await page.getByTitle('Customer Approved').click();
  await page.locator('button').filter({ hasText: 'Mark as Current Status' }).click();
  await page.getByRole('button', { name: 'Configure Enterprise Quote' }).click();
  await page.getByRole('tab', { name: 'Summary (1)' }).click();
  await page.getByRole('cell', { name: 'Row 1 Wireless@SG Dynamic' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Create Enterprise Order' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('cell', { name: 'Row 1 Wireless@SG Dynamic' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Create Final Orders', exact: true }).click();
  await page.getByTitle('Ready to Submit').click();
  await page.locator('button').filter({ hasText: 'Mark as Current Status' }).click();
  await page.getByRole('button', { name: 'Submit Orders' }).click();
  
  /*await page.getByRole('link', { name: 'View All Orders' }).click();
  await page.getByRole('rowheader').nth(0).click();
  
  await page.getByRole('link', { name: 'View All Orchestration Plans' }).click();
  await page.getByRole('rowheader').nth(0).click();*/
  
  await page.waitForTimeout(10000);
  
} catch (error) {
  // Capture the error message if test fails
  testResult.Status = 'Failed';
  testResult.ErrorMessage = error.message;
} finally {
  // Calculate execution time
  const endTime = Date.now();
  testResult.ExecutionTime = (endTime - startTime) / 1000; // Execution time in seconds

  await logTestResultInSalesforce(page, testResult);
}
});

test('check Orchestration Item', async ({ page }) => {
  const startTime = Date.now();
  const testResult = {
    Name: TEST_NAME_billing,
    Status: 'Passed',
    ExecutionTime: 0,
    Timestamp: new Date().toISOString(),
    ErrorMessage: '',
    AdditionalDetails: testData.additionalDetails
  };
  test.slow();
  test.setTimeout(3000000);
  try {
    
    await page.goto('https://test.salesforce.com/');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('ey_czupryn@m1b2b.com.dev');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Welcome-202411');
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
    await page.goto('https://m1limited--dev.sandbox.lightning.force.com/lightning/r/vlocity_cmt__OrchestrationPlan__c/a3S850000007eITEAY/view'); 
    await page.getByLabel('Reserve ONT Serial Number NF1').getByLabel('Show more actions').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('View Record (Opens in a new').click();
    const page1 = await page1Promise;
  } catch (error) {
    // Capture the error message if test fails
    testResult.Status = 'Failed';
    testResult.ErrorMessage = error.message;
  } finally {
    // Calculate execution time
    const endTime = Date.now();
    testResult.ExecutionTime = (endTime - startTime) / 1000; // Execution time in seconds

    await logTestResultInSalesforce(page, testResult);
  }
});

async function logTestResultInSalesforce(page, testResult) {
  const instanceUrl = 'https://m1limited--dev.sandbox.my.salesforce.com';
  const testRunUrl = `${instanceUrl}/lightning/o/AutomatedTestRun__c/list?filterName=Recent`;
  await page.goto(testRunUrl);

  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Automatedtest Name').fill(testResult.Name);
  await page.getByLabel('Test Name', { exact: true }).fill(testResult.Name);
  //await page.getByRole('combobox', { name: 'Status' }).click();
  //await page.getByRole('option', { name: testResult.Status }).locator('span').nth(1).click();
  await page.getByLabel('Execution Time').fill(testResult.ExecutionTime.toString());
  await page.getByLabel('Error Message').fill(testResult.ErrorMessage);
  await page.getByLabel('Additional Details').fill(testResult.AdditionalDetails);
  await page.getByLabel('Test Status').fill(testResult.Status);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(4000);
  console.log(`Test result for "${testResult.Name}" stored successfully in Salesforce.`);
}