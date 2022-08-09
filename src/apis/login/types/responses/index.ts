import { UserDataType } from "../../../../store/modules/types/user";

export interface LoginResponse {
  user: UserDataType;
  token: string;
}
