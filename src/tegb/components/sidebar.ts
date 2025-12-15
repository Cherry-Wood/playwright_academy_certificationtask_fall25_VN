import { Locator, Page } from "@playwright/test";

export class Sidebar {
  readonly page: Page;

  readonly navContainer: Locator;
  readonly homeItem: Locator;
  readonly accountsItem: Locator;
  readonly transactionsItem: Locator;
  readonly supportItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navContainer = page.locator("aside[class='dashboard-sidebar'] nav ul");
    this.homeItem = page.locator("//aside[@class='dashboard-sidebar']//li[1]");
    this.accountsItem = page.locator(
      "//aside[@class='dashboard-sidebar']//li[2]"
    );
    this.transactionsItem = page.locator(
      "//aside[@class='dashboard-sidebar']//li[3]"
    );
    this.supportItem = page.locator(
      "//aside[@class='dashboard-sidebar']//li[4]"
    );
  }
}
