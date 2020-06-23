import { soxa } from "./deps.ts";

export class YWH {
  readonly API_URL = "https://api.yeswehack.com";

  private _totpToken?: string;

  constructor() {
    soxa.defaults.baseURL = this.API_URL;
    soxa.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        if (error.response && error.response.status === 401) {
          throw new Error("Please verify your credentials or use TOTP.");
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Login with email and password
   *
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    const {
      data: { token, totp_token: totpToken },
    } = await soxa.post("/login", {
      email: email,
      password: password,
    });

    if (token != null) {
      soxa.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    this._totpToken = totpToken;
  }

  /**
   * Verify TOTP token with code
   *
   * @param code
   */
  async totp(code: string) {
    const { token } = await soxa.post("/account/totp", {
      code: code,
      token: this._totpToken,
    });

    if (token != null) {
      soxa.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  /**
   * Retrieve current user or given user
   */
  async user(username?: string) {
    if (username != null) {
      return soxa.get(`/hunters/${username}`);
    }

    return soxa.get("/user");
  }

  /**
   * Retrieve reports per page
   *
   * @param page
   */
  async reportsPerPage(page: Number) {
    const {
      data: { items },
    } = await soxa.get("/user/reports", { params: { page: page } });
    return items;
  }

  /**
   * Retrieve all reports
   */
  async reports() {
    let reports = [];
    let page = 1;
    let mustContinue = true;

    do {
      const data = await this.reportsPerPage(page);

      if (data.length > 0) {
        reports.push(data);
        page++;
      } else {
        mustContinue = false;
      }
    } while (mustContinue);

    return reports.flat();
  }

  /**
   * Retrieve hackivity per page
   *
   * @param page
   */
  async hacktivityPerPage(page: Number) {
    const {
      data: { items },
    } = await soxa.get("/hacktivity", { params: { page: page } });

    return items;
  }

  /**
   * Retrieve all reports
   */
  async hacktivity() {
    let hacks = [];
    let page = 1;
    let mustContinue = true;

    do {
      const data = await this.hacktivityPerPage(page);

      if (data.length > 0) {
        hacks.push(data);
        page++;
      } else {
        mustContinue = false;
      }
    } while (mustContinue);

    return hacks.flat();
  }

  /**
   * Retrieve programms per page
   *
   * @param page
   */
  async programsPerPage(page: Number) {
    const {
      data: { items },
    } = await soxa.get("/programs", { params: { page: page } });
    return items;
  }

  /**
   * Retrieve all programs
   */
  async programs() {
    let programs = [];
    let page = 1;
    let mustContinue = true;

    do {
      let data = await this.programsPerPage(page);

      if (data.length > 0) {
        programs.push(data);
        page++;
      } else {
        mustContinue = false;
      }
    } while (mustContinue);

    return programs.flat();
  }
}
