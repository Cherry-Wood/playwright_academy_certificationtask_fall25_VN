import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

import accountBalances from "../assets/ddt/accounts_balances.json";
import { UserApi } from "../src/tegb/api/user_api.ts";
import { LoginPage } from "../src/tegb/pages/login_page.ts";

test.describe("DDT: Create user using API, displayed balance on dashboard", () => {
  accountBalances.forEach((account, index) => {
    test(`${index + 1}. Check account balance: ${
      account.startBalance
    } Kč`, async ({ page, request }) => {
      const api = new UserApi(request);
      const loginPage = new LoginPage(page);

      const username =
        faker.internet.username() + "_" + faker.number.int({ max: 1_000 });
      const password = process.env.TEGB_DEFAULT_PASSWORD as string;
      const email = faker.internet.email({
        firstName: username,
        provider: "fake.testmail",
      });

      await api.registerNewUserReturnUserId(username, password, email);
      const token = await api.loginUserReturnToken(username, password);
      const accountNumber =
        await api.createNeWAccountWithTokenReturnAccountNumber(
          token,
          account.startBalance,
          "DDT"
        );

      await loginPage
        .open()
        .then((login) => login.fillUsername(username))
        .then((login) => login.fillPassword(password))
        .then((login) => login.clickLogin())
        .then((dashboard) => dashboard.accountsTableIsLoaded())
        .then((dashboard) =>
          dashboard.accountNumberDisplayHaveNumber(accountNumber)
        )
        .then((dashboard) =>
          dashboard.accountBalanceDisplayHaveNumber(account.startBalance)
        );
    });
  });
});
