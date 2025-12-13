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
}
