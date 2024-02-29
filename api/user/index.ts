import { AxiosInstance } from "axios";
import { UserInfoApi } from "@/api/user/info";

export class UserApi {
  public info: UserInfoApi;

  constructor(instance: AxiosInstance) {
    this.info = new UserInfoApi(instance);
  }
}
