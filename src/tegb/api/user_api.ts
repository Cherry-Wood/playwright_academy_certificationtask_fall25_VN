import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = process.env.TEGB_API_URL as string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async loginUserReturnToken(username: string, password: string) {
    const response = await this.request.post(`${this.apiUrl}/tegb/login`, {
      data: {
        username,
        password,
      },
    });
    const resBody = await response.json();
    const token = resBody.access_token;
    return token;
  }

  async registerNewUserReturnUserId(
    username: string,
    password: string,
    email: string
  ) {
    const response = await this.request.post(`${this.apiUrl}/tegb/register`, {
      data: { username, password, email },
    });
    const resBody = await response.json();
    if (resBody.message === "User already exists") {
      throw new Error("New User Registration Failed : User already exists");
    } else {
      const userId = resBody.userId;
      return userId;
    }
  }

  async createNeWAccountWithTokenReturnAccountId(
    token: string,
    startBalance: number,
    type: string
  ) {
    const response = await this.request.post(
      `${this.apiUrl}/tegb/accounts/create`,
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { startBalance, type },
      }
    );
    const resBody = await response.json();
    const accountId = resBody.accountId;
    return accountId;
  }
}
