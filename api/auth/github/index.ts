import { AxiosInstance } from "axios";


export class GithubAuthApi {
  // eslint-disable-next-line no-unused-vars
  constructor(private instance: AxiosInstance) {}

  async post(code: string) {
    const response = await this.instance.post("/auth/github", { code });
    return response.data;
  }
}
