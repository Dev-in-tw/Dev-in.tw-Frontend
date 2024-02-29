import { AxiosInstance } from "axios";

export class UserInfoApi {
  constructor(private instance: AxiosInstance) { }

  async get(token: string) {
    const response = await this.instance.get("/user/info",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  }
}
