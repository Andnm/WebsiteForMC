import axios, { AxiosInstance } from "axios";
import { getTokenFromSessionStorage } from "./handleToken";

class Http {
  instance: AxiosInstance;
  constructor() {
    const token = getTokenFromSessionStorage();

    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const http = new Http().instance;

export default http;
