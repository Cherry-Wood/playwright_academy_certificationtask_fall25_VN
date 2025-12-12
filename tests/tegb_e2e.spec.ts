import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/tegb/login_page.ts";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("E2E", async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username =
    faker.internet.username() + "_" + faker.number.int({ max: 1_000 });
  const password = faker.internet.password();
  const email = faker.internet.email({
    firstName: username,
    provider: "fake.testmail",
  });

  await loginPage
    .open()
    .then((login) => login.clickRegister())
    .then((register) => register.fillUsername(username))
    .then((register) => register.fillPassword(password))
    .then((register) => register.fillEmail(email))
    .then((register) => register.clickRegister())
    .then((login) => login.waitForSuccessMessage())
    .then((login) => login.fillUsername(username))
    .then((login) => login.fillPassword(password))
    //TODO: API request for mail creation
    .then((login) => login.clickLogin());

  //TODO: think about what to wait for instead of this temporaly direct locators
  await expect(
    page.locator("div [data-testid='profile-details-title']")
  ).toBeVisible();
  await expect(page.locator("div[data-testid='name']")).toBeVisible();
});
