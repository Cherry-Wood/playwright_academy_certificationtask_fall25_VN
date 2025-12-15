import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/tegb/pages/login_page.ts";
import { DashboardPage } from "../src/tegb/pages/dashboard_page.ts";
import { Sidebar } from "../src/tegb/components/sidebar.ts";
import { Topbar } from "../src/tegb/components/topbar.ts";

test.describe("Atomic Tests Dashboard", () => {
  let dashboardPage: DashboardPage;
  const username = process.env.TEGB_DEFAULT_USER as string;
  const password = process.env.TEGB_DEFAULT_PASSWORD as string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    dashboardPage = await loginPage
      .open()
      .then((login) => login.fillUsername(username))
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLogin())
      .then((dashboard) => dashboard.profileSummaryIsLoaded())
      .then((dashboard) => dashboard.accountsTableIsLoaded());
  });

  test("Profile summary shows elements", async () => {
    await test.step("Profile summary title", async () => {
      await expect
        .soft(dashboardPage.profileSummaryTitle, "Profile title is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.profileSummaryTitle, "Profile title has text")
        .toHaveText("Detaily Profilu");
    });
    await test.step("Profile summary details", async () => {
      await expect
        .soft(dashboardPage.nameDisplay, "Name display is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.nameDisplay, "Name display has text")
        .toContainText("Jméno:");
      await expect
        .soft(dashboardPage.surnameDisplay, "Surname display is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.surnameDisplay, "Surname display has text")
        .toContainText("Příjmení:");
      await expect
        .soft(dashboardPage.emailDisplay, "Email display is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.emailDisplay, "Email display has text")
        .toContainText("Email:");
      await expect
        .soft(dashboardPage.phoneDisplay, "Phone display is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.phoneDisplay, "Phone display has text")
        .toContainText("Telefon:");
      await expect
        .soft(dashboardPage.ageDisplay, "Age display is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.ageDisplay, "Age display has text")
        .toContainText("Věk:");
    });
    await test.step("Profile edit button", async () => {
      await expect
        .soft(dashboardPage.editProfileButton, "Profile edit button is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.editProfileButton, "Profile edit button has text")
        .toHaveText("Upravit profil");
    });
  });
  test("Accounts summary shows elements", async () => {
    await test.step("Accounts summary title", async () => {
      await expect
        .soft(
          dashboardPage.accountSummaryTitle,
          "Accounts summary title is visible"
        )
        .toBeVisible();
      await expect
        .soft(
          dashboardPage.accountSummaryTitle,
          "Accounts summary title has text"
        )
        .toHaveText("Účty");
    });
    await test.step("Accounts details table", async () => {
      await expect
        .soft(dashboardPage.accountsTable, "Account summary table is visible")
        .toBeVisible();
      await expect
        .soft(
          dashboardPage.accountsNumberHeader,
          "Account number Header is visible"
        )
        .toBeVisible();
      await expect
        .soft(
          dashboardPage.accountsNumberHeader,
          "Account number header has text"
        )
        .toHaveText("Číslo účtu");
      await expect
        .soft(dashboardPage.accountsBalanceHeader, "Balance header is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountsBalanceHeader, "Balance header has text")
        .toHaveText("Zůstatek");
      await expect
        .soft(
          dashboardPage.accountsTypeHeader,
          "Account type header is visible"
        )
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountsTypeHeader, "Account type header has text")
        .toHaveText("Typ účtu");
      await expect
        .soft(
          dashboardPage.accountNumberDisplay,
          "Account number display is visible"
        )
        .toBeVisible();
      await expect
        .soft(dashboardPage.accountBalanceDisplay, "Balance display is visible")
        .toBeVisible();
      await expect
        .soft(
          dashboardPage.accountBalanceDisplay,
          "Balance contains currency symbol"
        )
        .toContainText("Kč");
      await expect
        .soft(
          dashboardPage.accountTypeDisplay,
          "Account type display is visible"
        )
        .toBeVisible();
    });
    await test.step("Add account button", async () => {
      await expect
        .soft(dashboardPage.addAccountButton, "Add account button is visible")
        .toBeVisible();
      await expect
        .soft(dashboardPage.addAccountButton, "Add account button has text")
        .toHaveText("Přidat účet");
    });
  });
  test("Inner profile edit button texts", async () => {
    await test.step("Cancel edits button", async () => {
      await dashboardPage.clickEditProfile();
      await expect
        .soft(dashboardPage.editProfileButton, "Cancel edits button has text")
        .toHaveText("Zrušit úpravy");
      await dashboardPage.clickEditProfile();
      await expect
        .soft(dashboardPage.editProfileButton, "Edit profile button has text")
        .toHaveText("Upravit profil");
    });
    await test.step("Save edits button", async () => {
      await dashboardPage.clickEditProfile();
      await expect
        .soft(
          dashboardPage.saveChangesProfileButton,
          "Save changes button is visible"
        )
        .toBeVisible();
      await expect
        .soft(
          dashboardPage.saveChangesProfileButton,
          "Save changes button has text"
        )
        .toHaveText("Uložit změny");
      await dashboardPage.clickEditProfile();
    });
  });
  test.fixme("WIP: account button functionality", async () => {
    await dashboardPage.clickAddAccount();
    // not implemented yet
  });
  test("Sidebar items", async ({ page }) => {
    const sidebar = new Sidebar(page);

    await expect
      .soft(sidebar.navContainer, "Sidebar container is visible")
      .toBeVisible();
    await expect.soft(sidebar.homeItem, "1st item has text").toHaveText("Domů");
    await expect
      .soft(sidebar.accountsItem, "2nd item has text")
      .toHaveText("Účty");
    await expect
      .soft(sidebar.transactionsItem, "3rd item has text")
      .toHaveText("Transakce");
    await expect
      .soft(sidebar.supportItem, "4th item has text")
      .toHaveText("Podpora");
  });
  test("Topbar items", async ({ page }) => {
    const topbar = new Topbar(page);

    await test.step("Topbar shows elements", async () => {
      await expect.soft(topbar.logo, "Logo is visible").toBeVisible();
      await expect
        .soft(topbar.pageTitle, "Page title is visible")
        .toBeVisible();
      await expect
        .soft(topbar.pageTitle, "Page title contains text")
        .toContainText("TEG#B Dashboard");
      await expect
        .soft(topbar.logoutButton, "Logout button is visible")
        .toBeVisible();
      await expect
        .soft(topbar.logoutButton, "Logout button has text")
        .toHaveText("Odhlásit se");
    });
    await test.step("Logout button function", async () => {
      const url = process.env.TEGB_FRONTEND_URL as string;
      await topbar.clickLogout();
      await expect.soft(page, "URL is correct").toHaveURL(url);
    });
  });
});
