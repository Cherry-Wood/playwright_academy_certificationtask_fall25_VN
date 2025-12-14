import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;
  readonly profileLoading: Locator;

  readonly firstNameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly ageInput: Locator;
  readonly saveChangesProfileButton: Locator;
  readonly updateMessage: Locator;

  readonly nameDisplay: Locator;
  readonly surnameDisplay: Locator;
  readonly emailDisplay: Locator;
  readonly phoneDisplay: Locator;
  readonly ageDisplay: Locator;

  readonly accountNumberDisplay: Locator;
  readonly accountBalanceDisplay: Locator;
  readonly accountTypeDisplay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileLoading = page.locator("div[data-testid='profile-loading']");
    this.editProfileButton = page.locator(
      "button[data-testid='toggle-edit-profile-button']"
    );
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
    this.nameDisplay = page.locator("div[data-testid='name']");
    this.surnameDisplay = page.locator("div[data-testid='surname']");
    this.emailDisplay = page.locator("div[data-testid='email']");
    this.phoneDisplay = page.locator("div[data-testid='phone']");
    this.ageDisplay = page.locator("div[data-testid='age']");
    this.accountNumberDisplay = page.locator(
      "td[data-testid='account-number']"
    );
    this.accountBalanceDisplay = page.locator(
      "td[data-testid='account-balance']"
    );
    this.accountTypeDisplay = page.locator("td[data-testid='account-type']");
  }

  async clickEditProfile() {
    await expect(
      this.editProfileButton,
      "Edit profile button enabled"
    ).toBeEnabled();
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
      .toHaveText(number.toString() + " Kč");
    return this;
  }

  async accountTypeDisplayHaveText(text: string) {
    await expect
      .soft(this.accountTypeDisplay, "Account type display have text")
      .toHaveText(text);
    return this;
  }
}
