import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/tegb/pages/login_page.ts";
import { DashboardPage } from "../src/tegb/pages/dashboard_page.ts";

test("Profile detail visual test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const username = process.env.TEGB_VISUAL_USER as string;
  const password = process.env.TEGB_VISUAL_PASSWORD as string;

  await loginPage
    .open()
    .then((login) => login.fillUsername(username))
    .then((login) => login.fillPassword(password))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.profileSummaryIsLoaded());

  await expect(dashboardPage.profileSummaryDiv).toHaveScreenshot(
    "profile_summary_test.png"
  );
});
