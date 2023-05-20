import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = apiUrl + "/signin";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email: string, password: string): Promise<void> {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt: string): void {
  localStorage.setItem(tokenKey, jwt);
}

export function logout(): void {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser(): any {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt === null) {
      return null;
    }
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt(): string | null {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
