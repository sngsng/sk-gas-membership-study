/* eslint-disable consistent-return */
import ApiUrls from "../../constants/api_urls";
import hmsRequest from "../../network";
import { UserState } from "../../store/modules/User";
import { AuthNumberCheckBody, TermsIdCheckBody } from "./types/requests";
import { Terms } from "./types/responses";

// 약관리스트 불러오기.
export const fetchTermsList = async () => {
  try {
    const { data } = await hmsRequest(ApiUrls.TERMS_LIST, {
      svcCluFg: "01",
    });
    const { cluList } = data.responseData;
    return cluList;
  } catch (err) {
    return console.log(err);
  }
};

// 아이디 중복 체크
export const idCheckAPI = async (userId: TermsIdCheckBody) => {
  try {
    const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, userId);
    const { dupYn } = data.responseData;
    return dupYn;
  } catch (err) {
    return console.log("idCheckAPI : ", err);
  }
};

// signPart2 약관 리스트
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

// 본인인증 APP 인증 요청
export const sendSMS = async (body: Record<string, any>) => {
  console.log("body : ", body);
  try {
    const { data } = await hmsRequest(ApiUrls.REQUEST_APP, body);
    const { responseData } = data;
    return responseData;
  } catch (err) {
    return console.log("sendSMS : ", err);
  }
};

// 본인인증 SMS 인증확인
export const authenticationNumberCheckApi = async (
  body: AuthNumberCheckBody
) => {
  try {
    console.log("part4 body", body);
    const { data } = await hmsRequest(ApiUrls.AUTH_NUMBER_CHECK, body);
    const { responseData } = data;
    return responseData;
  } catch (err) {
    return console.log("authenticationNumberCheckApi : ", err);
  }
};

// 회원가입
export const signUpApi = async (body: UserState) => {
  try {
    const { data } = await hmsRequest(ApiUrls.SIGN_UP_REQUEST, body);
    return data;
    const { responseData } = data;
    // 뽑아낼만한 데이터?? 또는 에러 처리!
    return responseData;
  } catch (err) {
    return console.log("signUpApi : ", err);
  }
};
