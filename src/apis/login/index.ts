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

  return { user: responseData };
};

export default loginApi;
