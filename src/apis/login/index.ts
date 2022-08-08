import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import { login } from "../../util/Auth";

import { loginBody } from "./types/requests";

const loginApi = async (body: loginBody) => {
  const { data, headers } = await hmsRequest(ApiUrls.LOGIN, body);

  const { authorization } = headers;
  const { responseData, detailMsg } = data;

  if (detailMsg === "정상") {
    // 토큰 저장
    login(authorization);
  }

  return { user: responseData, detailMsg };
};

export default loginApi;
