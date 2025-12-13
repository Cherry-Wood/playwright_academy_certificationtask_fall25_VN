import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/tegb/pages/login_page.ts";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../src/tegb/api/user_api.ts";

test("E2E", async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const api = new UserApi(request);

  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000 });
  const password = faker.internet.password();
  const email = faker.internet.email({
    firstName: username,
    provider: "fake.testmail",
  });
  const startBalance = faker.number.float({
    min: -100_000_000,
    max: 100_000_000,
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
  const profileAge = faker.number.int({ min: 18, max: 90 });

  await loginPage
    .open()
    .then((login) => login.clickRegister())
    .then((register) => register.fillUsername(username))
    .then((register) => register.fillPassword(password))
    .then((register) => register.fillEmail(email))
    .then((register) => register.clickRegister())
    .then((login) => login.waitForSuccessMessage());

  const token = await api.loginUserReturnToken(username, password);
  const accountId = await api.createNeWAccountWithTokenReturnAccountId(
    token,
    startBalance,
    type
  );

  await loginPage
    .fillUsername(username)
    .then((login) => login.fillPassword(password))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickEditProfile());
});
