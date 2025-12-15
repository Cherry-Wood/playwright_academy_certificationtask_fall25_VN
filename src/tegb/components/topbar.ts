import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../pages/login_page.ts";

export class Topbar {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly logo: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator("button[data-testid='logout-button']");
    this.logo = page.locator("img[data-testid='logo-img']");
    this.pageTitle = page.locator("span[data-testid='app-title']");
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
