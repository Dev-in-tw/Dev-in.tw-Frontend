import type { AxiosInstance } from "axios";
import type { UserInfoResponse } from "@/types/apiType";

export class UserInfoApi {
  constructor(private instance: AxiosInstance) {}

  // token 參數保留以向後相容；實際 Bearer 由 interceptor 注入。
  async get(_token?: string): Promise<UserInfoResponse> {
    const response = await this.instance.get("/user/info");
    return response.data;
  }
}
