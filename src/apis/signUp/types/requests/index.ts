export interface TermsBody {
  // 01: 가입, 02: 유료멤버십, 03: 제휴사
  svcCluFg: "01";
}

export interface TermsIdCheckBody {
  // 아이디 중복 체크 조회
  lognId: string;
}

export interface RequestAppBody {
  // 본인인증 APP 인증요청
  name: string;
  phoneNo: string;
  birthday: string;
  gender: "0" | "1";
  phoneCorp: string;
  nation: string;
  terms1chk?: string;
  terms2chk?: string;
  terms3chk?: string;
  terms4chk?: string;
}

export interface RequestAuthenticationBody {
  // 본인인증 SMS 전송요청
  certNum: string;
  check1: string;
  trCert?: string;
}

export interface AuthNumberCheckBody {
  // SMS 인증 요청
  certNum: string;
  smsNum?: string;
  check1: string;
  check2: string;
  check3: string;
}
