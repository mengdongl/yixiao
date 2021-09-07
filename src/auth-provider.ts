import { http } from "utils/http";
import { User } from "./screens/project-list/search-panal";
export const localTokenKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localTokenKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localTokenKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return http(`/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then(async (res) => {
      return handleUserResponse(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const register = (data: { username: string; password: string }) => {
  return http(`/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  })
    .then(async (res) => {
      return handleUserResponse(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const logout = async () => window.localStorage.removeItem(localTokenKey);
