import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    });

    // this.instance.interceptors.request.use(
    //   (config) => {
    //     const token = getTokenFromLocalStorage();
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );
  }
}

const http = new Http().instance;

export default http;
