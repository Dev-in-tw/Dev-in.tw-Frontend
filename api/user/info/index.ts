import { AxiosInstance } from "axios";


export class UserInfoApi {
  // eslint-disable-next-line no-unused-vars
  constructor(private instance: AxiosInstance) {}

  async get(token: string) {
    const response = await this.instance.get("/user/info", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}
