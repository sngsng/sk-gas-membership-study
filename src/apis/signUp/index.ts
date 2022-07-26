import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import { TermsIdCheckBody } from "./types/requests";
import { Terms } from "./types/responses";

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

export const fetchPassAuthenticationTermsList = (): Terms[] => {
  return [
    {
      // 약관 코드
      cluCd: "1",

      // 약관 버전
      cluVer: "1.0",

      // 필수 약관여부
      mndtAgrYn: "Y",

      // 약관명
      cluShrtCtt: "(필수) 개인정보 수집/이용 취급위탁 동의 약관",
    },
    {
      // 약관 코드
      cluCd: "2",

      // 약관 버전
      cluVer: "1.0",

      // 필수 약관여부
      mndtAgrYn: "Y",

      // 약관명
      cluShrtCtt: "(필수) 고유식별정보의 처리에 관한 사항 동의",
    },
    {
      // 약관 코드
      cluCd: "3",

      // 약관 버전
      cluVer: "1.0",

      // 필수 약관여부
      mndtAgrYn: "Y",

      // 약관명
      cluShrtCtt: "(필수) 개인정보취급방침(전문) | ‘본인확인서비스‘",
    },
    {
      // 약관 코드
      cluCd: "4",

      // 약관 버전
      cluVer: "1.0",

      // 필수 약관여부
      mndtAgrYn: "Y",

      // 약관명
      cluShrtCtt: "(필수) 이용약관(전문) | 본인확인서비스",
    },
  ];
};
