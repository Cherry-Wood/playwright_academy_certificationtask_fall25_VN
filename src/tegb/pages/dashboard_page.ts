import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;
  readonly profileLoader: Locator;

  readonly firstNameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly ageInput: Locator;
  readonly saveChangesProfileButton: Locator;
  readonly updateMessage: Locator;

  readonly profileSummaryDiv: Locator;
  readonly profileSummaryTitle: Locator;
  readonly nameDisplay: Locator;
  readonly surnameDisplay: Locator;
  readonly emailDisplay: Locator;
  readonly phoneDisplay: Locator;
  readonly ageDisplay: Locator;

  readonly accountSummaryTitle: Locator;
  readonly accountNumberDisplay: Locator;
  readonly accountBalanceDisplay: Locator;
  readonly accountTypeDisplay: Locator;
  readonly accountsTable: Locator;
  readonly accountsLoader: Locator;
  readonly accountsNumberHeader: Locator;
  readonly accountsBalanceHeader: Locator;
  readonly accountsTypeHeader: Locator;
  readonly addAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      "button[data-testid='toggle-edit-profile-button']"
    );
    this.profileLoader = page.locator("div[data-testid='profile-loading']");

    this.firstNameInput = page.locator("input[data-testid='chage-name-input']");
    this.surnameInput = page.locator(
      "input[data-testid='chage-surname-input']"
    );
    this.emailInput = page.locator("input[data-testid='chage-email-input']");
    this.phoneInput = page.locator("input[data-testid='chage-phone-input']");
    this.ageInput = page.locator("input[data-testid='chage-age-input']");
    this.saveChangesProfileButton = page.locator(
      "button[data-testid='save-changes-button']"
    );
    this.updateMessage = page.locator("div[class='update-message']");

    this.profileSummaryDiv = page.locator("div[data-testid='account-summary']");
    this.profileSummaryTitle = page.locator(
      "div [data-testid='profile-details-title']"
    );
    this.nameDisplay = page.locator("div[data-testid='name']");
    this.surnameDisplay = page.locator("div[data-testid='surname']");
    this.emailDisplay = page.locator("div[data-testid='email']");
    this.phoneDisplay = page.locator("div[data-testid='phone']");
    this.ageDisplay = page.locator("div[data-testid='age']");

    this.accountSummaryTitle = page.locator(
      "div [data-testid='accounts-title']"
    );
    this.accountNumberDisplay = page.locator(
      "td[data-testid='account-number']"
    );
    this.accountBalanceDisplay = page.locator(
      "td[data-testid='account-balance']"
    );
    this.accountTypeDisplay = page.locator("td[data-testid='account-type']");
    this.accountsTable = page.locator("table[class='accounts-table']");
    this.accountsLoader = page.locator("div[data-testid='accounts-loading']");
    this.accountsNumberHeader = page.locator(
      "th[data-testid='account-number-heading']"
    );
    this.accountsBalanceHeader = page.locator(
      "th[data-testid='account-balance-heading']"
    );
    this.accountsTypeHeader = page.locator(
      "th[data-testid='account-type-heading']"
    );
    this.addAccountButton = page.locator(
      "button[data-testid='add-account-button']"
    );
  }

  async profileSummaryIsLoaded() {
    await expect(
      this.profileLoader,
      "Profile loader is detached"
    ).not.toBeAttached();
    await expect(
      this.editProfileButton,
      "Edit profile button is enabled"
    ).toBeEnabled();
    return this;
  }

  async accountsTableIsLoaded() {
    await expect(
      this.accountsLoader,
      "Accounts loader is detached"
    ).not.toBeAttached();
    await expect(this.accountsTable, "Accounts table is visible").toBeVisible();
    return this;
  }

  async clickEditProfile() {
    await this.profileSummaryIsLoaded();
    await this.editProfileButton.click();
    return this;
  }

  async fillFirstName(name: string) {
    await this.firstNameInput.fill(name);
    return this;
  }

  async fillSurname(surname: string) {
    await this.surnameInput.fill(surname);
    return this;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    return this;
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
    return this;
  }

  async fillAge(age: number) {
    await this.ageInput.fill(age.toString());
    return this;
  }

  async clickSaveChanges() {
    await this.saveChangesProfileButton.click();
    return this;
  }

  async updateMessageHaveText(text: string) {
    await expect
      .soft(this.updateMessage, "Update message have text")
      .toHaveText(text);
    return this;
  }

  async nameDisplayHaveText(text: string) {
    await expect
      .soft(this.nameDisplay, "Name display have text")
      .toHaveText("Jméno: " + text);
    return this;
  }

  async surnameDisplayHaveText(text: string) {
    await expect
      .soft(this.surnameDisplay, "Surname display have text")
      .toHaveText("Příjmení: " + text);
    return this;
  }

  async emailDisplayHaveText(text: string) {
    await expect
      .soft(this.emailDisplay, "Email display have text")
      .toHaveText("Email: " + text);
    return this;
  }

  async phoneDisplayHaveText(text: string) {
    await expect
      .soft(this.phoneDisplay, "Phone display have text")
      .toHaveText("Telefon: " + text);
    return this;
  }

  async ageDisplayHaveNumber(number: number) {
    await expect
      .soft(this.ageDisplay, "Age display have number")
      .toHaveText("Věk: " + number.toString());
    return this;
  }

  async accountNumberDisplayHaveNumber(number: number) {
    await expect
      .soft(this.accountNumberDisplay, "Account number display have number")
      .toHaveText(number.toString());
    return this;
  }

  async accountBalanceDisplayHaveNumber(number: number) {
    await expect
      .soft(this.accountBalanceDisplay, "Account balance display have number")
      .toHaveText(number.toFixed(2) + " Kč");
    return this;
  }

  async accountTypeDisplayHaveText(text: string) {
    await expect
      .soft(this.accountTypeDisplay, "Account type display have text")
      .toHaveText(text);
    return this;
  }

  async clickAddAccount() {
    await this.accountsTableIsLoaded();
    await this.addAccountButton.click();
    return this;
  }
}
