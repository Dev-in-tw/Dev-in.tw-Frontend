import { AxiosInstance } from "axios";

export class GithubAuthApi {
  constructor(private instance: AxiosInstance) {}

  async post(code: string) {
    const response = await this.instance.post("/auth/github", { code });
    return response.data;
  }
}
