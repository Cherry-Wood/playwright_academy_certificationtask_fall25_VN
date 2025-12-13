import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class RegisterAccountPage {
  readonly page: Page;
  readonly usernameImput: Locator;
  readonly passwordImput: Locator;
  readonly emailImput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameImput = page.locator("input[data-testid$='username-input']");
    this.passwordImput = page.locator("input[data-testid$='password-input']");
    this.emailImput = page.locator("input[data-testid$='email-input']");
    this.registerButton = page.locator("[type='submit']");
  }

  async fillUsername(username: string) {
    await this.usernameImput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordImput.fill(password);
    return this;
  }

  async fillEmail(email: string) {
    await this.emailImput.fill(email);
    return this;
  }

  async clickRegister() {
    await this.registerButton.click();
    return new LoginPage(this.page);
  }
}
