// import { plainToInstance } from "class-transformer";
import { useQuery } from "react-query";
import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import TermsIdCheckBody from "./types/requests/TermsIdCheckBody";

// import TermsIdCheck from "./types/responses/TermsIdCheck";

// eslint-disable-next-line import/prefer-default-export
// export const useIdCheckApi = async (body: TermsIdCheckBody) => {
//   console.log(body);
//   const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, body);
//   const { responseData } = data;
//   console.log(responseData);
//   return plainToInstance(TermsIdCheck, responseData);
// };

// eslint-disable-next-line import/prefer-default-export
export function idCheckAPI1(id: TermsIdCheckBody) {
  console.log("호출전", id);
  return useQuery("idCheckApi", async () => {
    const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, id);
    console.log("호출후");
    console.log(data);
  });
}

// export const idCheckAPI = async (useId: TermsIdCheckBody) => {
//   const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, { lognId: useId });
//   const { responseData } = data;
//   console.log(responseData);
// };
