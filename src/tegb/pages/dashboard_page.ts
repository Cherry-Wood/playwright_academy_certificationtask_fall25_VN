import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      "button[data-testid='toggle-edit-profile-button']"
    );
  }

  async clickEditProfile() {
    await this.editProfileButton.click();
    return this;
  }
}
