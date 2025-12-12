import { expect, Locator, Page } from "@playwright/test";
import { RegisterAccountPage } from "./register_account_page.ts";
import { DashboardPage } from "./dashboard_page.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = process.env.TEGB_FRONTEND_URL as string;
  readonly usernameImput: Locator;
  readonly passwordImput: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameImput = page.locator("input[data-testid$='username-input']");
    this.passwordImput = page.locator("input[data-testid$='password-input']");
    this.loginButton = page.locator("[type='submit']");
    this.registerButton = page.locator(
      "button[data-testid$='register-button']"
    );
    this.successMessage = page.locator("div[data-testid=success-message]");
  }

  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string) {
    await this.usernameImput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordImput.fill(password);
    return this;
  }

  async clickLogin() {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async clickRegister() {
    await this.registerButton.click();
    return new RegisterAccountPage(this.page);
  }

  async waitForSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    return this;
  }
}
