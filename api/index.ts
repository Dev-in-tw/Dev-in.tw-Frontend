import axios, { type AxiosInstance } from "axios";

// auth
import { AuthApi } from "@/api/auth";

// domain
import { DomainApi } from "@/api/domain";

// user
import { UserApi } from "@/api/user";

// token helpers
import { clearToken, getToken } from "@/lib/authToken";

class ApiClient {
  private instance: AxiosInstance;
  public auth: AuthApi;
  public user: UserApi;
  public domain: DomainApi;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });

    // request：自動注入 Bearer token（client 端才有 token）
    this.instance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // response：401 → 清 token + 導回登入（僅 client 端）
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
          clearToken();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    this.auth = new AuthApi(this.instance);
    this.user = new UserApi(this.instance);
    this.domain = new DomainApi(this.instance);
  }
}

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL as string);
export default apiClient;
