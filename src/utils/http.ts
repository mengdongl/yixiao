import { useAuth } from './../context/auth-context';
import qs from "qs";
import * as auth from "auth-provider";

export const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, headers, token, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  let requestUrl = ''
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  const regx = new RegExp(/^(https?)/)
  if (regx.test(endpoint)) {
    requestUrl = endpoint
  } else {
    requestUrl = `${apiUrl}${endpoint}`
  }
  return fetch(requestUrl, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
    const { user } = useAuth()
    return (...[endpoint,config]: Parameters<typeof http>) => http(endpoint,{...config, token: user?.token})
}
