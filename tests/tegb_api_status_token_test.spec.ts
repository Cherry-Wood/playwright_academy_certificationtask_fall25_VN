import { test, expect } from "@playwright/test";

test("API login is status 201 and returns token", async ({ request }) => {
  const baseUrl = process.env.TEGB_API_URL as string;
  const username = process.env.TEGB_DEFAULT_USER as string;
  const password = process.env.TEGB_DEFAULT_PASSWORD as string;

  const res = await request.post(`${baseUrl}/tegb/login`, {
    data: { username, password },
  });

  expect(res.status(), "Response status to be 201").toBe(201);
  const responseBody = await res.json();
  expect(responseBody, "access_token exist in body").toHaveProperty(
    "access_token"
  );
  expect(
    typeof responseBody.access_token,
    "access_token is type string"
  ).toEqual("string");
});
