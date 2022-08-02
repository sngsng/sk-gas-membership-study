const ApiUrls = {
  BASE_URL:
    // "https://cors-anywhere.herokuapp.com/https://appdev.happylpg.com/apis/hmsmob",
    "https://appdev.happylpg.com/apis/hmsmob",

  // /**/ 회원가입 part

  // 약관목록 조회
  TERMS_LIST: "/mbr/cluList",
  TERMS_DETAIL_LIST: "/mbr/cluDet",
  TERMS_ID_CHECK: "/mbr/chkDupLgnId",

  // 본인인증 APP 인증요청
  REQUEST_APP: "/mbr/reqKmcCertApp",
  // 본인인증 SMS 전송요청
  REQUEST_SMS1: "/mbr/sndKmcCertSms",
  // 본인인증 SMS 인증확인
  AUTH_NUMBER_CHECK: "/mbr/chkKmcCertSms",
  // 회원가입 요청
  SIGN_UP_REQUEST: "/mbr/join",
};

export default ApiUrls;
