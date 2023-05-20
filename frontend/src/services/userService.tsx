import http from "./httpService";
import { apiUrl } from "../config.js";

const apiEndpoint = apiUrl + "/signup";

export function register(user: {
  name: string;
  email: string;
  password: string;
}) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}
