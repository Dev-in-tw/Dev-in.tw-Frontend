import type { AxiosInstance } from "axios";
import type { AuthResponse } from "@/types/apiType";

export class GithubAuthApi {
  constructor(private instance: AxiosInstance) {}

  async post(code: string): Promise<AuthResponse> {
    const response = await this.instance.post("/auth/github", { code });
    return response.data;
  }
}
