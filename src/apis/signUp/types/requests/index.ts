export interface TermsBody {
  // 01: 가입, 02: 유료멤버십, 03: 제휴사
  svcCluFg: "01";
}

export interface TermsIdCheckBody {
  // 아이디 중복 체크 조회
  lognId: string;
}

export interface AuthNumberCheckBody {
  // SMS 인증 요청
  certNum: string;
  smsNum?: string;
  check1: string;
  check2: string;
  check3: string;
}
