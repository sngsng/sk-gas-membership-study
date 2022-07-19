import axios, { AxiosRequestConfig } from "axios";
import { format } from "date-fns"; // 날짜 데이터 불러오는 라이브러리
import { Channel, ServiceCode } from "./types/enums";
import ApiUrls from "../constants/api_urls";
import { getAuthToken } from "../util/local-storage.utils";
// import TermsListBody from "../apis/common/types/requests/TermsListBody";

// /**
//  * 공통 전문 Transaction 난수 생성 (날짜 + 6자리난수)
//  */
export const createTransactionNo = () => {
  const date = format(new Date(), "yyyyMMddHHmmss");
  const min = 100000;
  const max = 999999;
  const randomNo = Math.floor(Math.random() * (max - min)) + min;
  return `${date}${randomNo}`;
};

const hmsRequest = (url: string, body: Record<string, any>) => {
  const axiosInstance = axios.create({
    baseURL: ApiUrls.BASE_URL,
  });

  // 헤더 설정
  const token = getAuthToken() || "";
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json;charset=utf-8",
      "Cache-Control": "no-cache",
      authorization: token,
    },
    withCredentials: true,
  };

  const trcNo = createTransactionNo();
  console.log("trcNo : ", trcNo);
  const baseBody = {
    serviceCode: ServiceCode.SK_WEB,
    chnl: Channel.MOBILE_WEB,
    version: "1.0",
    trcNo,
    requestData: body,
  };

  console.log("baseBody : ", baseBody);

  return axiosInstance.post(url, baseBody, config);
};

export default hmsRequest;

// const getTermsList = (body: TermsListBody) => {
//   return axios({
//     method: "post",
//     url: `${ApiUrls.BASE_URL}${ApiUrls.TERMS_LIST}`,
//     headers: {
//     "Content-Type": "application/json;charset=utf-8",
//     Accept: "application/json;charset=utf-8",
//     "Cache-Control": "no-cache",
//     authorization: token,
//     },
//     withCredentials: true,
//     data: {
//       serviceCode: ServiceCode.SK_WEB,
//       chnl: Channel.MOBILE_WEB,
//       version: "1.0",
//       trcNo,
//       requestData: body,
//     },
//   })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export default getTermsList;
