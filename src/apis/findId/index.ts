import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import { FindIdBody } from "./types/requests";
import { findIdResult } from "./types/responses";

// eslint-disable-next-line import/prefer-default-export
export const findIdAPI = async (body: FindIdBody): Promise<findIdResult> => {
  const { data } = await hmsRequest(ApiUrls.FIND_ID, body);
  const { responseData } = data;

  return responseData;
};
