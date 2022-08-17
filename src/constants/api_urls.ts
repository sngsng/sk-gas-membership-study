const ApiUrls = {
  BASE_URL: process.env.REACT_APP_API_URL,

  // /**/ 회원가입 part

  // 약관목록 조회
  TERMS_LIST: "/mbr/cluList",
  TERMS_DETAIL_LIST: "/mbr/cluDet",
  TERMS_ID_CHECK: "/mbr/chkDupLgnId",

  // 본인인증 APP 인증요청
  REQUEST_APP: "/mbr/reqKmcCertApp",
  // 본인인증 SMS 전송요청
  REQUEST_SMS1: "/mbr/sndKmcCertSms",
  // 본인인증 SMS 재요청
  REQUEST_SMS_RETRY: "/mbr/resndKmcCertSms",
  // 본인인증 SMS 인증확인
  AUTH_NUMBER_CHECK: "/mbr/chkKmcCertSms",
  // 회원가입 요청
  SIGN_UP_REQUEST: "/mbr/join",

  // 로그인
  LOGIN: "/comm/reqLogin",

  // 아이디 찾기
  FIND_ID: "/mbr/findId",
};

export default ApiUrls;
