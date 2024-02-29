import axios, { AxiosInstance } from "axios";

// auth
import { AuthApi } from "@/api/auth";

// user
import { UserApi } from "@/api/user";

class ApiClient {
  private instance: AxiosInstance;
  public auth: AuthApi;
  public user: UserApi

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
    this.auth = new AuthApi(this.instance);
    this.user = new UserApi(this.instance);
  }
}

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL as string);
export default apiClient;
