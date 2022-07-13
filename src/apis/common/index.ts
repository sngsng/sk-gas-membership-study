import { plainToInstance } from "class-transformer";
import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import FetchTermsDetailRequestBody from "./types/requests/TermsDetailBody";
import TermsListBody from "./types/requests/TermsListBody";
import Terms from "./types/responses/Terms";
import TermsDetail from "./types/responses/TermsDetail";

// 약관 목록 조회
export const getTermsList = async (body: TermsListBody) => {
  const { data } = await hmsRequest(ApiUrls.TERMS_LIST, body);
  const { responseData } = data;
  const { cluList } = responseData;
  return plainToInstance(Terms, cluList as JSON[]);
};

export const SignUpTermsList = () => {
  return getTermsList({
    svcCluFg: "01",
  });
};

// 약관 상세 조회
export const getTermsDetail = async (
  body: FetchTermsDetailRequestBody
): Promise<TermsDetail> => {
  const { data } = await hmsRequest(ApiUrls.TERMS_DETAIL_LIST, body);
  const { responseData } = data;
  return plainToInstance(TermsDetail, responseData);
};
