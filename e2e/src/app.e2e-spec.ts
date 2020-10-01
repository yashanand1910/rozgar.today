import { browser, ExpectedConditions as until } from 'protractor';
import { AppSharedPage } from './page-objects/app-shared.po';

describe('when the app loads', () => {
  let app: AppSharedPage;

  beforeAll(async () => {
    app = new AppSharedPage();
    await app.navigateAndSetLanguage();
  });

  it('should display the join page', async () => {
    expect(await browser.driver.getCurrentUrl()).toContain('/join');
  });
});
