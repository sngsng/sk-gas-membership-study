import { ResponseCode } from "./enums";

export interface BaseApiResponse<Response = any> {
  resCode: ResponseCode | string;
  detailMsg: string;
  trcNo: string;
  responseData?: Response;
}
