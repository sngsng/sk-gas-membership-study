import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import TermsIdCheckBody from "./types/requests/TermsIdCheckBody";

// eslint-disable-next-line import/prefer-default-export
export const idCheckAPI = async (useId: TermsIdCheckBody) => {
  try {
    const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, useId);
    const { dupYn } = data.responseData;

    if (dupYn === "Y") {
      alert("중복된 아이디 입니다.");
    } else if (dupYn === "N") {
      alert("사용가능한 아이디입니다.");
    }
  } catch (err) {
    console.log(err);
  }
};
