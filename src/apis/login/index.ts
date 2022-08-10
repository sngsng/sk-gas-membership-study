import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";

import { setToken } from "../../util/Auth";

import { loginBody } from "./types/requests";
import { LoginResponse } from "./types/responses";

const loginApi = async (body: loginBody): Promise<LoginResponse> => {
  const { data, headers } = await hmsRequest(ApiUrls.LOGIN, body);

  const { responseData } = data;

  const { authorization } = headers;

  setToken(authorization);

  return { user: responseData, token: authorization };
};

export default loginApi;
