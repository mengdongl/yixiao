import { User } from "./screens/project-list/search-panal";
const baseUrl = process.env.REACT_APP_API_URL;
export const localTokenKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localTokenKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localTokenKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
        return Promise.reject(data);
      }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () => window.localStorage.removeItem(localTokenKey);
