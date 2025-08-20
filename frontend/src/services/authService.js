import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

export class AuthService {
  static tokenKey = "auth_tokens";

  static storeTokens(tokens) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokens));
  }

  static getTokens() {
    const tokensStr = localStorage.getItem(this.tokenKey);
    return tokensStr ? JSON.parse(tokensStr) : null;
  }

  static getAccessToken() {
    const tokens = this.getTokens();
    return tokens ? tokens.access_token : null;
  }

  static getRefreshToken() {
    const tokens = this.getTokens();
    return tokens ? tokens.refresh_token : null;
  }

  static clearTokens() {
    localStorage.removeItem(this.tokenKey);
  }

  static async refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await axios.post(
        `${API_URL}/v1/protected/auth/refresh-token`,
        {
          refresh_token: refreshToken,
        }
      );

      // Store the new tokens
      this.storeTokens(response.data);
      return response.data.access;
    } catch (error) {
      // If refresh fails, clear tokens and force re-login
      this.clearTokens();
      return null;
    }
  }
}
