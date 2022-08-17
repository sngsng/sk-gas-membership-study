import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { format } from "date-fns"; // 날짜 데이터 불러오는 라이브러리
import { Channel, ResponseCode, ServiceCode } from "./types/enums";
import { getAuthToken } from "../util/local-storage.utils";

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
  const axiosInstance = axios.create();
  //
  // 헤더 설정
  const token = getAuthToken() || "";
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json;charset=utf-8",
      "Cache-Control": "no-cache",
      authorization: token,
    },
    // timeout: 10,
    withCredentials: true,
  };

  const trcNo = createTransactionNo();
  const baseBody = {
    serviceCode: ServiceCode.SK_WEB,
    chnl: Channel.MOBILE_WEB,
    version: "1.0",
    trcNo,
    requestData: body,
  };

  // 에러처리
  const onFulfilled = (res: AxiosResponse) => {
    const { data } = res;
    const { resCode } = data;
    if (resCode !== ResponseCode.SUCCESS) {
      console.log(new Error(data.detailMsg));
      return Promise.reject(data);
    }
    return res;
  };

  axiosInstance.interceptors.response.use(onFulfilled);

  return axiosInstance.post(url, baseBody, config);
};

export default hmsRequest;
