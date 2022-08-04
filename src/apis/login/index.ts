import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import { loginBody } from "./types/requests";

const loginApi = async (body: loginBody) => {
  const { data, headers } = await hmsRequest(ApiUrls.LOGIN, body);

  console.log("----------------login data----------------");
  console.log(data);

  console.log("----------------header----------------");
  console.log(headers);

  localStorage.setItem("token", headers.authorization);
  const { responseData } = data;
  // 토큰을 굳이 다른곳에서 할필요는 없을듯..!
  return { user: responseData, auth: headers.authorization };
  // data에서 토큰값이랑 유저 정보 return? 후에 접근 막기 (회원가입부분으로 접근하는거!)
};

export default loginApi;
