import { expect, test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

import { LoginPage } from "../src/tegb/pages/login_page.ts";
import { UserApi } from "../src/tegb/api/user_api.ts";
import { DashboardPage } from "../src/tegb/pages/dashboard_page.ts";
import { Topbar } from "../src/tegb/components/topbar.ts";

test("E2E: user registration, account, profile edit", async ({
  page,
  request,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const topbar = new Topbar(page);
  const api = new UserApi(request);

  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000 });
  const password = faker.internet.password();
  const email = faker.internet.email({
    firstName: username,
    provider: "fake.testmail",
  });
  const startBalance = faker.number.float({
    min: -99_999_999,
    max: 99_999_999,
    multipleOf: 0.01,
  });
  const type = faker.finance.transactionType();
  const profileName = faker.person.firstName();
  const profileSurname = faker.person.lastName();
  const profileEmail = faker.internet.email({
    firstName: profileName,
    lastName: profileSurname,
    provider: "fake.testmail",
  });
  const profilePhone = faker.phone.number({ style: "international" });
  const profileAge = faker.number.int({ min: 0, max: 122 });
  const profileAgeString = faker.number.romanNumeral();

  let accountNumber: number;

  await test.step("User registration in UI", async () => {
    await loginPage
      .open()
      .then((login) => login.clickRegister())
      .then((register) => register.fillUsername(username))
      .then((register) => register.fillPassword(password))
      .then((register) => register.fillEmail(email))
      .then((register) => register.clickRegister())
      .then((login) => login.waitForSuccessMessage());
  });

  await test.step("API login and bank account creation", async () => {
    const token = await api.loginUserReturnToken(username, password);
    accountNumber = await api.createNeWAccountWithTokenReturnAccountNumber(
      token,
      startBalance,
      type
    );
  });

  await test.step("User login, open profile edit", async () => {
    await loginPage
      .fillUsername(username)
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLogin())
      .then((dashboard) => dashboard.clickEditProfile());
  });

  await test.step("Validation age must be number (alert)", async () => {
    let dialogMessage = "";
    await dashboardPage.ageInput.fill(profileAgeString);
    page.once("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await dashboardPage.clickSaveChanges();
    expect(dialogMessage, "Validation alert have text").toBe(
      "Věk musí být číslo."
    );
  });

  await test.step("Fill profile edit form and save valid data", async () => {
    await dashboardPage
      .fillFirstName(profileName)
      .then((dashboard) => dashboard.fillSurname(profileSurname))
      .then((dashboard) => dashboard.fillEmail(profileEmail))
      .then((dashboard) => dashboard.fillPhone(profilePhone))
      .then((dashboard) => dashboard.fillAge(profileAge))
      .then((dashboard) => dashboard.clickSaveChanges())
      .then((dashboard) =>
        dashboard.updateMessageHaveText("Profile updated successfully!")
      );
  });

  await test.step("Dashboard verify: profile, account", async () => {
    await dashboardPage
      .nameDisplayHaveText(profileName)
      .then((dashboard) => dashboard.surnameDisplayHaveText(profileSurname))
      .then((dashboard) => dashboard.emailDisplayHaveText(profileEmail))
      .then((dashboard) => dashboard.phoneDisplayHaveText(profilePhone))
      .then((dashboard) => dashboard.ageDisplayHaveNumber(profileAge))
      .then((dashboard) =>
        dashboard.accountNumberDisplayHaveNumber(accountNumber)
      )
      .then((dashboard) =>
        dashboard.accountBalanceDisplayHaveNumber(startBalance)
      )
      .then((dashboard) => dashboard.accountTypeDisplayHaveText(type));
  });

  await test.step("Logout", async () => {
    await topbar.clickLogout();
  });
  
});
