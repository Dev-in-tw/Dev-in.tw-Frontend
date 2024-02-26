import axios, { AxiosInstance } from 'axios';

// auth
import { AuthApi } from '@/api/auth';


class ApiClient {
  private instance: AxiosInstance;
  public auth: AuthApi;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
    this.auth = new AuthApi(this.instance);
  }
}


const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL as string);
export default apiClient;
