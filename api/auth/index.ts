import { AxiosInstance } from "axios";
import { GithubAuthApi } from "@/api/auth/github";


export class AuthApi {
  public github: GithubAuthApi;

  constructor(instance: AxiosInstance) {
    this.github = new GithubAuthApi(instance);
  }
}
