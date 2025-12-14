import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../pages/login_page.ts";

export class Topbar {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator("button[data-testid='logout-button']");
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
